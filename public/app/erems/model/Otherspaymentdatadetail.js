Ext.define('Erems.model.Otherspaymentdatadetail', {
    extend: 'Ext.data.Model',
    alias: 'model.otherspaymentdatadetailmodel',
        
    idProperty: 'payment_id',

    fields: [
        {
            name: 'payment_id',
            type: 'int'
        },{
            name: 'is_reference_rejected',
            type: 'int'
        },{
            name: 'detail'
        },{
            name: 'payment_date',
            type: 'string'
        },
        {
            name: 'cair_date',
            type: 'string'
        },{
            name: 'due_date',
            type: 'string'
        },{
            name:'paymentflag_id',
            type:'int'
        },
        {
            name:'purchaseletter_id',
            type:'int'
        },
        {
            name:'paymentmethod_id',
            type:'int'
        },
        {
            name:'payment',
            type:'float'
        },
        {
            name:'total_payment',
            type:'float'
        },
        {
            name:'adm_fee',
            type:'float'
        },
        {
            name:'denda',
            type:'float'
        },
        {
            name:'note',
            type:'string'
        },
        {
            name:'reference',
            type:'string'
        },
        {
            name:'name',
            type:'string'
        },
        {
            name:'address',
            type:'string'
        },
        {
            name:'telp_home',
            type:'string'
        },
        {
            name:'telp_office',
            type:'string'
        },
        {
            name:'mobile_phone',
            type:'string'
        },
        {
            name:'city_id',
            type:'int'
        }
    ]
});