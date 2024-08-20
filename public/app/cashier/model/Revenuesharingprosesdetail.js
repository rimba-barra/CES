Ext.define('Cashier.model.Revenuesharingprosesdetail', {
    extend: 'Ext.data.Model',
    alias : 'model.revenuesharingprosesdetailmodel',
    idProperty: 'revenuesharing_detail_id',
    fields: [
        { name: 'revenuesharing_detail_id', type: 'int' },
        { name: 'revenuesharing_id', type: 'int' },
        { name: 'cluster_code', type: 'string' },
        { name: 'unit_number', type: 'string' },
        { name: 'payment_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u' },
        { name: 'payment', type: 'decimal' },
        { name: 'rs_payment', type: 'decimal' },
        { name: 'rs_total_partner_dpp', type: 'decimal' },
        { name: 'rs_total_partner_ppn', type: 'decimal' },
        { name: 'rs_total_partner_pph', type: 'decimal' },
        { name: 'rs_total_ciputra_dpp', type: 'decimal' },
        { name: 'rs_total_ciputra_ppn', type: 'decimal' },
        { name: 'rs_total_ciputra_pph', type: 'decimal' }
    ]
});