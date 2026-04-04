// admissions.js - fee structure public page info
const router = require('express').Router();
router.get('/info', (req, res) => {
  res.json({
    process: [
      { step: 1, title: 'Fill Online Form', desc: 'Complete the registration form with all details' },
      { step: 2, title: 'Document Verification', desc: 'Submit required documents at school office' },
      { step: 3, title: 'Entrance Assessment', desc: 'Child appears for basic assessment (Class 1 onwards)' },
      { step: 4, title: 'Confirmation', desc: 'Receive admission confirmation and pay fees' }
    ],
    documents: ['Birth Certificate', 'Aadhar Card', 'Previous School TC', 'Report Card', 'Passport Photos (4)', 'Address Proof'],
    eligibility: {
      'Nursery': '3-4 years',
      'KG': '4-5 years',
      '1st': '5-6 years',
      '2nd-8th': 'As per previous class result'
    }
  });
});
module.exports = router;
