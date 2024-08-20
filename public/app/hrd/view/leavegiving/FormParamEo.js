Ext.define('Hrd.view.leavegiving.FormParamEo', {
    alias: 'widget.leavegivingformparameo',
    extend: 'Hrd.library.box.view.FormData',
    //requires: ['Hrd.view.leavegiving.GridBandingEo','Hrd.view.leavegiving.GridBandingContractEo'],
    requires: [],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    height: 250,
    initComponent: function() {
        var me = this;





        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'parametercutieo_id'
                },
                {
                    xtype:'label',
                    itemId:'labelTerbit',
                    text:'Parameter Cuti Extra Off/Extra Leave hanya digunakan oleh:',
                    style: 'color:black;',
                    margin: '10 0 0 0',
                },
                {
                    xtype:'label',
                    itemId:'labelTerbitCitradream',
                    text:'- Hotel CitraDream : ketentuan dari Tukar Shift (LongShift & is MoD)',
                    style: 'color:black;',
                    margin: '20 0 0 0',
                },
                {
                    xtype:'label',
                    itemId:'labelTerbitHotel',
                    text:'- Hotel Ciputra Jakarta & Hotel Ciputra Semarang : ketentuan dari 6 hari selama seminggu & 4 kali sebulan',
                    style: 'color:black;',
                    margin: '10 0 0 0',
                },
                {
                    xtype:'label',
                    itemId:'labelNote',
                    text:'*Silahkan contact MIS KP jika ditempat Anda ingin menggunakan Cuti Extra Off juga.',
                    style: 'color:black;',
                    margin: '50 0 0 0',
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
                        text: 'Cancel',
                        handler: function() {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    }
});