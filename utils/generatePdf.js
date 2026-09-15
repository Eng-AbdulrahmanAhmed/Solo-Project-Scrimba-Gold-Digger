import PDFDocument from 'pdfkit';

export async function createPdf(req, res) {
    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    const queryObj = Object.fromEntries(urlObj.searchParams);

    const amount = Number(queryObj.amount) || 0;
    const price = Number(queryObj.price) || 0;
    const ounce = parseFloat(Number(queryObj.ounce).toFixed(4)) || 0;

    console.log("Generating PDF for query params:", queryObj);

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=GoldDigger_Receipt.pdf');

    doc.pipe(res);

    // --- 1. HEADER BANNER ---
    doc.rect(0, 0, 612, 60).fill('#eff229');

    doc.fillColor('#FFFFFF')
        .font('Helvetica-Bold')
        .fontSize(20)
        .text('GOLD DIGGER', 50, 20);

    // --- 2. INVOICE METADATA ---
    doc.fillColor('#1F2937')
        .fontSize(24)
        .text('INVOICE', 50, 90);

    const issueDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 15);

    doc.fontSize(10)
        .font('Helvetica')
        .fillColor('#4B5563')
        .text('Invoice #: INV-2026-001', 50, 125)
        .text(`Date: ${issueDate.toLocaleDateString()}`, 50, 140)
        .text(`Due Date: ${dueDate.toLocaleDateString()}`, 50, 155);

    // Bill To (Right Aligned)
    doc.font('Helvetica-Bold')
        .fillColor('#1F2937')
        .text('Billed To:', 350, 90)
        .font('Helvetica')
        .fillColor('#4B5563');

    // Horizontal Divider
    doc.moveTo(50, 185).lineTo(562, 185).strokeColor('#E5E7EB').stroke();

    // --- 3. ITEM TABLE ---
    let y = 200;

    // Table Header Background
    doc.rect(50, y, 512, 25).fill('#F3F4F6');

    // Table Headers
    doc.fillColor('#374151')
        .font('Helvetica-Bold')
        .fontSize(10)
        .text('Item Description', 60, y + 8)
        .text('Qty', 320, y + 8, { width: 50, align: 'right' })
        .text('Price', 390, y + 8, { width: 70, align: 'right' })
        .text('Total', 480, y + 8, { width: 70, align: 'right' });

    y += 35;

    // Table Rows Data
    const items = [
        { desc: 'Gold', Ounce: ounce, price: price }
    ];

    doc.font('Helvetica').fillColor('#1F2937');

    items.forEach(item => {
        const lineTotal = amount;

        doc.text(item.desc, 60, y)
            .text(item.Ounce.toString(), 320, y, { width: 50, align: 'right' })
            .text(`$${item.price.toFixed(2)}`, 390, y, { width: 70, align: 'right' })
            .text(`$${lineTotal.toFixed(2)}`, 480, y, { width: 70, align: 'right' });

        y += 20;
        doc.moveTo(50, y - 5).lineTo(562, y - 5).strokeColor('#F3F4F6').stroke();
    });

    // --- 4. TOTALS SECTION ---
    y += 15;

    doc.font('Helvetica-Bold')
        .fontSize(12)
        .text('Grand Total:', 350, y)
        .text(`$${amount}`, 480, y, { width: 70, align: 'right' });

    // --- 5. FOOTER ---
    doc.fontSize(9)
        .font('Helvetica')
        .fillColor('#9CA3AF')
        .text('Thank you for your business!', 50, 700, { align: 'center', width: 512 });

    doc.end();
}
