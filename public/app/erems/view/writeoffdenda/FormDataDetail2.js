Ext.define('Erems.view.writeoffdenda.FormDataDetail2', {
    extend      : 'Ext.panel.Panel',
    alias       : 'widget.writeoffdendaformdatadetail2',
    requires    : [],
    frame       : true,
    autoScroll  : true,
    anchorSize  : 100,
    height      : 250,
    bodyBorder  : true,
    bodyPadding : 10,
    bodyStyle   : 'padding:5px 5px 0',
    defaults    : {
        border : false,
        xtype  : 'panel',
        flex   : 1,
        layout : ''
    },
    initComponent : function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
				{
                    xtype  : 'hiddenfield',
                    itemId : 'fdms_writeoffdetail_id',
                    name   : 'writeoffdetail_id'
                },
				{
                    xtype  : 'hiddenfield',
                    itemId : 'fdms_writeoff_id',
                    name   : 'writeoff_id'
                },
				{
                    xtype  : 'hiddenfield',
                    itemId : 'fdms_pl_id',
                    name   : 'purchaseletter_id'
                },
				/* POPUP SCHEDULE */
				{
                    xtype  : 'writeoffdendadetailgrid2',
                    width  : '100%',
                    itemId : 'MyDetailGrid2'
				}
			]
        });

        me.callParent(arguments);
    }
});