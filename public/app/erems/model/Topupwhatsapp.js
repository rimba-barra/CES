Ext.define('Erems.model.Topupwhatsapp', {
    extend: 'Ext.data.Model',
    alias: 'model.topupwhatsappmodel',
    idProperty: 'whatsapp_topup_id',
    fields: [
        {name: 'whatsapp_topup_id', type: 'int'},
        {name: 'user_id', type: 'int'},
        {name: 'topup_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'nominal', type: 'decimal'},
        {name: 'bukti_topup', type: 'string'},
        {name: 'is_approve', type: 'boolean'},
        {name: 'approve_user', type: 'int'},
        {name: 'approve_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'is_reject', type: 'boolean'},
        {name: 'reject_user', type: 'int'},
        {name: 'reject_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'user_fullname', type: 'string'},
        {name: 'approve_fullname', type: 'string'},
        {name: 'reject_fullname', type: 'string'},
    ]
});