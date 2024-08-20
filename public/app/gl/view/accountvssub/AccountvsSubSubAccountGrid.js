Ext.define('Gl.view.accountvssub.AccountvsSubSubAccountGrid', {
    extend: 'Gl.library.template.view.Grid',
    alias: 'widget.accountvssubsubaccountgrid',
    itemId: 'AccountvsSubSubAccountGrid',
    store: 'AccountvsSubSubAccountJournal',
    cls: 'subaccountjournal',
    bindPrefixName: 'Accountvssub',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            features: [
                {
                    ftype: 'summary',
                }
            ],
            viewConfig: {
            },
            selModel: {
                injectCheckbox: 0,
                pruneRemoved: false
            },
            columns: [
                {xtype: 'rownumberer'},
                {
                    xtype: 'gridcolumn',
                    text: 'ID',
                    dataIndex: 'journalsubdetail_id_sub',
                    hidden: true,
                    hideable: false,
                    width: 40,
                    align: 'right'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Sub Account',
                    dataIndex: 'code_sub',
                    hideable: false,
                    width: 150
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Code 1',
                    dataIndex: 'code1_sub',
                    hideable: false,
                    width: 70
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Code 2',
                    dataIndex: 'code2_sub',
                    hideable: false,
                    width: 70
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Code 3',
                    dataIndex: 'code3_sub',
                    hideable: false,
                    width: 70
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Code 4',
                    dataIndex: 'code4_sub',
                    hideable: false,
                    width: 70
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Keterangan',
                    dataIndex: 'keterangan_sub',
                    hideable: false,
                    width: 70
                },
                {
                    header: 'Sub Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    dataIndex: 'amount_sub',
                    align: 'right',
                    width: 200,
                    summaryType: 'sum',
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        var summaryvalue = Ext.util.Format.number(value, '0,000.00');
                        return  "Sum Total : " + summaryvalue;
                    }

                },
                me.generateActionColumn(),
            ]
        });
        me.callParent(arguments);
    },
});