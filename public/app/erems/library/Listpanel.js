Ext.define('Erems.library.Listpanel', {
    config: {
        panel: '',
        app: 'Erems',
        category: 'view',
        name: 'facilitiestype'
    },
    constructor: function(config) {
        this.initConfig(config);
        return this;
    },
    mainPanelName: '',
    searchPanelName: '',
    gridPanelName:'',
    run: function() {
        this.createFormSearch();
        this.createMainPanel();
        this.panel.items = [{
                xtype: this.mainPanelName
            }];




    },
    setGridPanelName:function(name){
      this.gridPanelName = name;  
    },
    createFormSearch: function() {
        var name = this.name.toLowerCase();
        var panelName = name + 'formsearch';
        this.searchPanelName = panelName;
        Ext.define(this.app + '.' + this.category + '.' + name + '.FormSearch', {
            extend: 'Ext.form.Panel',
            alias: 'widget.' + panelName,
            frame: true,
            autoScroll: true,
            bodyBorder: true,
            bodyPadding: 10,
            bodyStyle: 'border-top:none;border-left:none;border-right:none;',
            initComponent: function() {
                var me = this;

                Ext.applyIf(me, {
                    defaults: {
                        labelAlign: 'top',
                        labelSeparator: ' ',
                        labelClsExtra: 'small',
                        fieldStyle: 'margin-bottom:3px;',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            itemId: 'code',
                            name: 'code',
                            fieldLabel: 'Code',
                            enforceMaxLength: true,
                            maskRe: /[^\`\"\']/,
                            maxLength: 50
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'facilitiestype',
                            name: 'facilitiestype',
                            fieldLabel: 'Faciltities Type',
                            enforceMaxLength: true,
                            maskRe: /[^\`\"\']/,
                            maxLength: 50
                        },
                        
                        {
                            xtype: 'textfield',
                            itemId: 'description',
                            name: 'description',
                            fieldLabel: 'Description',
                            enforceMaxLength: true,
                            maskRe: /[^\`\"\']/,
                            maxLength: 50
                        }
                    ],
                    dockedItems: [
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
                                    action: 'search',
                                    itemId: 'btnSearch',
                                    padding: 5,
                                    width: 75,
                                    iconCls: 'icon-search',
                                    text: 'Search'
                                },
                                {
                                    xtype: 'button',
                                    action: 'reset',
                                    itemId: 'btnReset',
                                    padding: 5,
                                    width: 75,
                                    iconCls: 'icon-reset',
                                    text: 'Reset'
                                }
                            ]
                        }
                    ]
                });

                me.callParent(arguments);
            }

        });
    },
    createMainPanel: function() {
        var name = this.name.toLowerCase();
        var panelName = name + 'mainpanel';
        this.mainPanelName = panelName;
        var that = this;
        
        Ext.define(this.app + '.' + this.category + '.' + name + '.Mainpanel', {
            extend: 'Ext.panel.Panel',
            alias: 'widget.' + panelName,
            requires: [
                that.app + '.' + that.category + '.' + name + '.FormSearch',
                that.app + '.' + that.category + '.' + name + '.Grid'
            ],
            itemId: name,
            bodyPadding: 2,
            layout:{
              type:'border'  
            },
            initComponent: function() {
                var me = this;
                
                this.items = [
                    {   xtype:that.searchPanelName,
                        region: 'west',
                        split: true,
                        maxWidth: 500,
                        minWidth: 300,
                        width: 300,
                        collapsed: true,
                        collapsible: true,
                        iconCls: 'icon-search',
                        title: 'Search'
                    },
                    {
                        xtype: that.gridPanelName,
                        region: 'center'
                    }];

                me.callParent(arguments);
            }

        });
    }


});
