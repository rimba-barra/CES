Ext.define('Cashier.view.bankpositionreport.FormContent', {
    extend: 'Ext.form.Panel',
    alias: 'widget.bankpositionreportformcontent',
    layout: 'vbox',
    padding: '0 0 0 10',
    bodyStyle: 'background-color:#dfe8f5;',
    border: false,
    uniquename: "_fcbankpositionreport",
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'hiddenfield',
                    id: 'hideparam' + me.uniquename,
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'bankpositionreportgridprefix',
                    itemId: 'fd_bankpositionreportgridprefix' + me.uniquename,
                    id: 'bankpositionreportgridprefix' + me.uniquename,
                    name: 'bankpositionreportgridprefix' + me.uniquename,
                    title: 'Prefix Voucher',
                    width: '97%',
                    height: 300,
                    padding: '20px 0 0 20px',
                },
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '0 0 0 0px',
                    items: [
                        {
                            xtype: 'button',
                            action: 'close',
                            itemId: 'btnClose',
                            iconCls: 'icon-cancel',
                            padding: 5,
                            text: 'Close',
                            handler: function () {
                                this.up('window').close();
                            }
                        }
                    ]
                }
            ],
        });
        me.callParent(arguments);
    },
});
