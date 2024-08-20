Ext.define('Hrd.view.alokasibiaya.FormData', {
    alias: 'widget.alokasibiayaformdata',
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
                    name: 'alokasibiaya_id'
                },
                {
                    name:'code',
                    fieldLabel:'Kode'
                },
                {
                    width:500,
                    name:'name',
                    fieldLabel:'Keterangan'
                }

            ],
            dockedItems: [],
            /* comment by Wulan Sari 2018.05.09
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
                
            ]*/
        });

        me.callParent(arguments);
    }
   
});