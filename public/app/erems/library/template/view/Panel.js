Ext.define('Erems.library.template.view.Panel', {
    extend                    : 'Ext.panel.Panel',
    alias                     : 'widget.templateviewpanel',
    requires                  : [],
    itemId                    : 'TemplateViewPanel',
    layout                    : { type : 'border' },
    gridPanelName             : 'gridpanelname',
    formSearchPanelName       :'formsearchpanelname',
    formSearchheaderPanelName :'',
    initComponent             : function() {
        var me = this;

        var itemObj = [];

        if(me.formSearchheaderPanelName){
            itemObj.push({
                xtype       : me.formSearchheaderPanelName,
                region      : 'north',
                split       : true,
                collapsed   : true,
                collapsible : true,
                iconCls     : 'icon-search',
                title       : 'Search'
            });
        }

        if(me.formSearchPanelName){
            itemObj.push({
                xtype       : me.formSearchPanelName,
                region      : 'west',
                split       : true,
                maxWidth    : 500,
                minWidth    : 300,
                width       : 300,
                collapsed   : true,
                collapsible : true,
                iconCls     : 'icon-search',
                title       : 'Search'
            });
        }

        if(me.gridPanelName){
            itemObj.push({
                xtype  : me.gridPanelName,
                region : 'center'
            });
        }

        Ext.applyIf(me, {
            items : itemObj
        });

        me.callParent(arguments);
    }
});