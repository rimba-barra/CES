Ext.define('Erems.view.pengalihanhak.Hgbajbgrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pengalihanhakhgbajbgrid',
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
                    itemId: 'colms_hgbnumber',
                    width: 150,
                    dataIndex: 'hgb_number',
                    hideable: false,
                    text: 'HGB Number'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_hgb_date',
                    width: 150,
                    dataIndex: 'hgb_date',
                    hideable: false,
                    text: 'HGB Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                }
            ]
        });

        me.callParent(arguments);
    }
});