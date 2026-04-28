"use client";

export default function PrintButton({
  targetId,
  label = "Print / Save PDF",
}: {
  targetId: string;
  label?: string;
}) {
  function handlePrint() {
    const content = document.getElementById(targetId);
    if (!content) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Velora - Print</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            color: #4a3f44;
            padding: 30px;
            line-height: 1.6;
          }
          .print-header {
            text-align: center;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 2px solid #f0e3e8;
          }
          .print-header h1 {
            font-size: 24px;
            color: #7f5665;
            margin-bottom: 4px;
          }
          .print-header p {
            font-size: 12px;
            color: #b98fa1;
          }
          h2 { font-size: 18px; margin: 20px 0 10px; color: #4a3f44; }
          h3 { font-size: 15px; margin: 14px 0 6px; color: #7f5665; }
          h4 { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #b98fa1; margin: 10px 0 6px; }
          p, li { font-size: 13px; color: #6f5a62; }
          ul, ol { padding-left: 20px; }
          li { margin-bottom: 4px; }
          .meal-card {
            border: 1px solid #f0e3e8;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 16px;
            page-break-inside: avoid;
          }
          .meal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
          }
          .slot-badge {
            background: #fdf2f5;
            color: #d8a7b5;
            padding: 2px 10px;
            border-radius: 20px;
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .price { font-weight: 600; color: #4a3f44; }
          .meta { display: flex; gap: 16px; font-size: 11px; color: #b98fa1; margin: 8px 0; }
          .benefits { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
          .benefit-tag {
            background: #fdf2f5;
            color: #b98fa1;
            padding: 2px 8px;
            border-radius: 20px;
            font-size: 10px;
          }
          .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          .grocery-category { margin-bottom: 16px; }
          .grocery-item {
            display: flex; align-items: center; gap: 8px;
            padding: 4px 0; font-size: 13px; color: #6f5a62;
          }
          .checkbox { width: 14px; height: 14px; border: 1.5px solid #d8a7b5; border-radius: 3px; }
          .total-bar {
            background: #fdf2f5;
            padding: 12px 16px;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            margin: 16px 0;
            font-size: 13px;
          }
          @media print {
            body { padding: 15px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="print-header">
          <h1>✦ Velora Wellness</h1>
          <p>${new Date().toLocaleDateString("en", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
        ${content.innerHTML}
      </body>
      </html>
    `);

    printWindow.document.close();

    // Wait for content to render then trigger print
    setTimeout(() => {
      printWindow.print();
    }, 500);
  }

  return (
    <button
      onClick={handlePrint}
      className="btn-outline flex items-center gap-2 text-sm"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
      {label}
    </button>
  );
}
