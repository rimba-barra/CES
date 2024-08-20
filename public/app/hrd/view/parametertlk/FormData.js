Ext.define('Hrd.view.parametertlk.FormData', {
    alias: 'widget.parametertlkformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: [],
    frame: true,
    autoScroll: true,
    editedRow:-1,
    deletedData:{},
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults:{
                xtype:'textfield'
            },
            items: [
                {
                    xtype:'hiddenfield',
                    name:'parametertlk_id'
                },
                {
                    fieldLabel:'Kode proyek',
                    name:'code'
                },
                {
                    fieldLabel:'Nama Proyek',
                    width:400,
                    name:'name'
                },
                {
                    fieldLabel:'Uang Transport',
                    name:'uang_transport',
                    maskRe: /[0-9-.]/,
                },
                {
                    fieldLabel:'Uang saku',
                    name:'uang_saku',
                    maskRe: /[0-9-.]/
                }
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});