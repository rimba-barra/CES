Ext.define('Erems.view.admincollection.Hgbajbgrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.admincollectionhgbajbgrid',
    store: 'Hgbajb',
    requires: [
        //'Erems.library.template.component.Sourcemoneycombobox'
    ],
    height: 100,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'rownumberer'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_ajb_number',
                    width: 150,
                    dataIndex: 'ajb_number',
                    hideable: false,
                    text: 'AJB Number'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_ajb_date',
                    width: 150,
                    dataIndex: 'ajb_date',
                    hideable: false,
                    text: 'AJB Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_hgb_tocustomer_date',
                    width: 150,
                    dataIndex: 'hgb_tocustomer_date',
                    hideable: false,
                    text: 'HGB Send to Customer',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_ajb_tocustomer_date',
                    width: 150,
                    dataIndex: 'ajb_tocustomer_date',
                    hideable: false,
                    text: 'AJB Send to Customer',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                }
            ]
        });

        me.callParent(arguments);
    }
});