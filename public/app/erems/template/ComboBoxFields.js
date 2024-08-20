Ext.define('Erems.template.ComboBoxFields', {
    cluster: {
        d: 'cluster',
        v: 'cluster_id',
        c: ['code']
    },
    block: {
        d: 'block',
        v: 'block_id',
        c: ['code'],
    },
    unit: {
        d: 'unit_number',
        v: 'unit_id',
        c: ['unit_number'],
    },
    blockx: {
        d: 'block.block',
        v: 'block.block_id',
        c: ['block.code'],
    },
    unitx: {
        d: 'unit.unit_number',
        v: 'unit.unit_id',
        c: ['unit.unit_number'],
    },
    unitstatus: {
        d: 'status',
        v: 'unitstatus_id',
        c: ['status'],
    },
    position: {
        d: 'position',
        v: 'position_id',
        c: ['code'],
    },
    plafon: {
        d: 'plafon',
        v: 'plafon_id',
        c: ['plafon_id'],
    },
    pricetype: {
        d: 'pricetype',
        v: 'pricetype_id',
        c: ['code'],
    },
    productcategory: {
        d: 'productcategory',
        v: 'productcategory_id',
        c: ['code'],
    },
    pt: {
        d: 'name',
        v: 'pt_id',
        c: ['code'],
    },
    type: {
        d: 'name',
        v: 'type_id',
        c: ['code'],
    },
    employee: {
        d: 'employee_name',
        v: 'employee_id',
        c: ['employee_nik']
    },
    salesman: {
        d: 'employee_name',
        v: 'employee_id',
        c: ['employee_nik']
    },
    expensetype: {
        d: 'expensetype',
        v: 'expensetype_id',
        c: ['code']
    },
    sourcemoney: {
        d: 'sourcemoney',
        v: 'sourcemoney_id',
        c: ['sourcemoney']
    },
    clubcitra: {
        d: 'clubname',
        v: 'citraclub_id',
        c: ['code'],
    },
    citraclub: {
        d: 'clubname',
        v: 'citraclub_id',
        c: ['code'],
    },
    saleslocation: {
        d: 'saleslocation',
        v: 'saleslocation_id',
        c: ['code'],
    },
    mediapromotion: {
        d: 'mediapromotion',
        v: 'mediapromotion_id',
        c: ['code'],
    },
    bank: {
        d: 'bank_name',
        v: 'bank_id',
        c: ['bank_id'],
    },
    purpose: {
        d: 'purpose',
        v: 'purpose_id',
        c: ['code'],
    },
    side: {
        d: 'side',
        v: 'side_id',
        c: ['code'],
    },
    education: {
        d: 'education',
        v: 'education_id',
        c: ['education_id'],
    },
    department: {
        d: 'department',
        v: 'department_id',
        c: ['code'],
    },
    religion: {
        d: 'religion',
        v: 'religion_id',
        c: ['religion_id'],
    },
    city: {
        d: 'city_name',
        v: 'city_id',
        c: ['city_id'],
    },
    country: {
        d: 'country_name',
        v: 'country_id',
        c: ['country_code'],
    },
    facilitiestype: {
        d: 'facilitiestype',
        v: 'facilitiestype_id',
        c: ['code'],
    },
    reasonchgname: {
        d: 'reasonchgname',
        v: 'reasonchgname_id',
        c: ['code'],
    },
    spktype: {
        d: 'spktype',
        v: 'spktype_id',
        c: ['spktype_id'],
    },
    contractor: {
        d: 'contractorname',
        v: 'contractor_id',
        c: ['code'],
    },
    paymentmethod: {
        d: 'paymentmethod',
        v: 'paymentmethod_id',
        c: ['code'],
    },
    paymenttype: {
        d: 'paymenttype',
        v: 'paymenttype_id',
        c: ['code'],
    },
    scheduletype: {
        d: 'scheduletype',
        v: 'scheduletype_id',
        c: ['scheduletype'],
    },
    buildingclass: {
        d: 'name',
        v: 'id',
        c: ['id'],
    },
 /* start added by ahmad riadi */
    bentukusaha: {
        d: 'bentukusaha',
        v: 'bentukusaha_id',
        c: ['bentukusaha'],
    },
     documenttype: {
        d: 'documenttype',
        v: 'documenttype_id',
        c: ['documenttype'],
    },
    instrumentpembayaran: {
        d: 'instrumentpembayaran',
        v: 'instrumentpembayaran_id',
        c: ['instrumentpembayaran'],
    },
    provinsi: {
        d: 'province_name',
        v: 'province_id',
        c: ['province_name'],
    },
    tanahcode: {
        d: 'name',
        v: 'pt_id',
        c: ['code'],
    },
    purposebuy: {
        d: 'purposebuy',
        v: 'purposebuy_id',
        c: ['purposebuy'],
    },
    verification: {
        d: 'verification',
        v: 'verification_id',
        c: ['name'],
    },
    verification_detail: {
        d: 'verification_type',
        v: 'verification_detail_id',
        c: ['verification_type'],
    },
    spk: {
        d: 'spk_no',
        v: 'spk_id',
        c: ['spk_id'],
    },
});