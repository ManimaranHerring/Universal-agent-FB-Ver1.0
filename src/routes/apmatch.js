const express = require('express');
}
}


if (status === 'MATCH') {
matches += 1;
} else {
exceptions.push({
po_number: po.po_number,
line_id: po.line_id,
sku: po.sku,
status,
issue: issues.join(' | ')
});
}
}


// Invoices that don't exist on PO
for (const [k, inv] of invMap.entries()) {
if (!poMap.has(k)) {
exceptions.push({
po_number: inv.po_number,
line_id: inv.line_id,
sku: inv.sku || '',
status: 'EXTRA_INVOICE',
issue: 'Invoice line does not exist on PO'
});
}
}


return { matches_count: matches, exceptions };
}


router.post('/match', upload.fields([{ name: 'po' }, { name: 'grn' }, { name: 'invoice' }]), (req, res) => {
try {
const poRows = parseCsvFromBuffer(req.files.po[0].buffer);
const grnRows = parseCsvFromBuffer(req.files.grn[0].buffer);
const invRows = parseCsvFromBuffer(req.files.invoice[0].buffer);
return res.json(match(poRows, grnRows, invRows));
} catch (e) {
return res.status(400).json({ error: 'Failed to process CSVs', detail: e.message });
}
});


router.get('/match/sample', (req, res) => {
try {
const base = path.join(__dirname, '..', '..', 'samples');
const size = (req.query && req.query.size === 'large') ? 'large' : 'sample';
const poRows = parseCsvFromBuffer(fs.readFileSync(path.join(base, `po_${size}.csv`)));
const grnRows = parseCsvFromBuffer(fs.readFileSync(path.join(base, `grn_${size}.csv`)));
const invRows = parseCsvFromBuffer(fs.readFileSync(path.join(base, `invoice_${size}.csv`)));
return res.json(match(poRows, grnRows, invRows));
} catch (e) {
return res.status(500).json({ error: 'Sample files not found', detail: e.message });
}
});


module.exports = router;
