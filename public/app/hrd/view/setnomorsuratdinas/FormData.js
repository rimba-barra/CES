Ext.define('Hrd.view.setnomorsuratdinas.FormData', {
    alias: 'widget.setnomorsuratdinasformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: [],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;



        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'nomorsuratdinas_id'
                },
                {
                    name:'infiks',
                    fieldLabel:'infiks'
                },
                {
                    name:'tahun',
                    fieldLabel:'Tahun'
                },
                {
                    name:'bulan',
                    fieldLabel:'bulan',
                   
                },
                {
                    name:'nomor',
                    fieldLabel:'Nomor',
                   
                }

            ],
            dockedItems: [],
            tbar: [
                {
                    padding: '4px 6px',
                    xtype: 'button',
                    disabled:true,
                     action: 'save',
                    cls: 'InfoButton',
                    text: 'Save',
                    iconAlign: 'left',
                    iconCls: 'icon-save'
                },
                '->'
                
            ]
        });

        me.callParent(arguments);
    }
   
});