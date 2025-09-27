const express = require('express');
spec: spec || '',
assumptions: [
qty >= 10000 ? 'Volume discount applied' : 'Standard volume',
spec ? `Spec factor for: ${spec}` : 'No spec factor'
].join('; ')
});
}


const tax = subtotal * 0.05; // example 5%
const total = subtotal + tax;


return {
buyer_meta: {
company: opts.buyer_company || 'Unknown Co',
contact: opts.buyer_contact || 'Unknown',
incoterms: opts.incoterms || 'EXW'
},
currency,
margin_target: margin,
line_items: out,
totals: { subtotal: round2(subtotal), tax: round2(tax), grand_total: round2(total) },
generated_at: new Date().toISOString()
};
}


router.post('/quote', upload.single('rfq'), (req, res) => {
try {
const meta = req.body || {};
const rows = parseCsvFromBuffer(req.file.buffer);
const quote = buildQuote(rows, meta);
return res.json(quote);
} catch (e) {
return res.status(400).json({ error: 'Failed to parse RFQ CSV', detail: e.message });
}
});


router.get('/quote/sample', (req, res) => {
try {
const file = (req.query && req.query.file === 'large') ? 'rfq_large.csv' : 'rfq_sample.csv';
const samplePath = path.join(__dirname, '..', '..', 'samples', file);
const rows = parseCsvFromBuffer(fs.readFileSync(samplePath));
const quote = buildQuote(rows, req.query || {});
return res.json(quote);
} catch (e) {
return res.status(500).json({ error: 'Sample RFQ not found', detail: e.message });
}
});


module.exports = router;
