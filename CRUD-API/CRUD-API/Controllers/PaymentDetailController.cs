using CRUD_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace CRUD_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentDetailController : ControllerBase
    {
        private PaymentDetailContext _context;

        public PaymentDetailController(PaymentDetailContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetPayment()
        {
            var payment = await _context.PaymentDetails.ToListAsync();
            return Ok(payment);
        }

        [HttpPost]
        public async Task<IActionResult> AddStudent(PaymentDetails paymentDetail)
        {
            _context.PaymentDetails.Add(paymentDetail);
            await _context.SaveChangesAsync();
            return Ok(paymentDetail);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPaymentDetailById(int id)
        {
            var paymentDetails = await _context.PaymentDetails.FindAsync(id);
            if (paymentDetails == null)
            {
                return NotFound($"Payment Details with ID {id} not found.");
            }
            return Ok(paymentDetails);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayment(int id)
        {
            var paymentDetails = await _context.PaymentDetails.FindAsync(id);
            if (paymentDetails == null)
            {
                return NotFound($"Payment Details with ID {id} not found.");
            }

            _context.PaymentDetails.Remove(paymentDetails);
            await _context.SaveChangesAsync();

            return Ok($"Payment Details with ID {id} has been deleted.");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePaymentDetails(int id, PaymentDetails updatedPaymentDetails)
        {
            if (id != updatedPaymentDetails.PaymentDetalId)
            {
                return BadRequest("Payment Detail ID mismatch.");
            }

            var existingPaymentDetails = await _context.PaymentDetails.FindAsync(id);
            if (existingPaymentDetails == null)
            {
                return NotFound($"Payment detail with ID {id} not found.");
            }

            // Update properties
            existingPaymentDetails.CardOwnerName = updatedPaymentDetails.CardOwnerName;
            existingPaymentDetails.CardNumber = updatedPaymentDetails.CardNumber;
            existingPaymentDetails.ExpireionDate = updatedPaymentDetails.ExpireionDate;
            existingPaymentDetails.SecurityCode = updatedPaymentDetails.SecurityCode;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(existingPaymentDetails);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
