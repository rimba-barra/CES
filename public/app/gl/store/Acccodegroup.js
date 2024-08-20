Ext.define('Gl.store.Acccodegroup', {
    extend: 'Ext.data.Store',
    alias: 'store.acccodegroupstore',
    requires: [
        'Gl.model.Acccodegroup'
    ],
    data: [
        {id: 1, code: '01',desc:'Active'},
        {id: 1, code: '02',desc:'Passive'}
    ]
});