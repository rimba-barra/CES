Ext.define('Hrd.view.absentrecord.FormSanksiKeterlambatanView', {
    alias: 'widget.absentrecordformsanksiketerlambatanview',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    requires: ['Hrd.template.ComboBoxFields', 'Hrd.view.absentrecord.GridEmployeeSanksiKeterlambatanView'],
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'sanksiketerlambatan_id'
                },
                
                {
                    xtype:'label',
                    itemId:'labelJumlahView',
                    margin:'15px 5px 5px 5px',
                    text:'Jumlah karyawan terpilih: 0',
                },
                {
                    xtype: 'absentrecordemployeesanksiketerlambatangridview',
                    height: 300
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function() {
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Close',
                        handler: function() {
                            this.up('window').close();
                        }
                    },
                ]
            }
        ];
        return x;
    }
});