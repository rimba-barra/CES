Ext.define('Erems.view.openticket.Panel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.templateviewpanel',
    requires: [],
    itemId: 'TemplateViewPanel',
    layout: {
        type: 'border'
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
					region : 'center',
			        xtype : "component",
			        autoEl : {
			            tag : "iframe",
			            src : "http://localhost/support/autoaccount.php?do=create&email=daviet_arielholic@yahoo.co.id"
			        }
                }
            ]
        });

        me.callParent(arguments);
    }

});
