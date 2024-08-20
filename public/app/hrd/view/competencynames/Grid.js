Ext.define('Hrd.view.competencynames.Grid', {
    extend          : 'Hrd.library.box.view.Grid',
    alias           : 'widget.competencynamesgrid',
    storeConfig     : {
        id          : 'CompetencynamesGridStore',
        idProperty  : 'competency_name_id',
        extraParams : {}
    },
    bindPrefixName  : 'Competencynames',
    newButtonLabel  : 'New',
    initComponent   : function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu     : me.generateContextMenu(),
            dockedItems     : me.generateDockedItems(),
            defaults        : {
                xtype       : 'gridcolumn',
                width       :75
            },
            viewConfig      : {},
            selModel        : Ext.create('Ext.selection.CheckboxModel', {}),
            columns         : [{
                xtype       : 'rownumberer'
            }, {
               dataIndex    : 'code',
               text         : 'Code'
            }, {
               dataIndex    : 'competency_name',
               text         : 'Competency Name',
               width        : 200
            }, {
               dataIndex    : 'competency_category',
               text         : 'Competency Category',
               width        : 200
            },
            
            me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems : function() {
        var me          = this;
        var dockedItems = [{
            xtype   : 'toolbar',
            dock    : 'top',
            height  : 28,
            items   : [{
                xtype       : 'button',
                action      : 'create',
                hidden      : true,
                itemId      : 'btnNew',
                margin      : '0 5 0 0',
                iconCls     : 'icon-new',
                bindAction  : me.bindPrefixName + 'Create',
                text        : me.newButtonLabel
            }, {
                xtype       : 'button',
                action      : 'update',
                disabled    : true,
                hidden      : true,
                itemId      : 'btnEdit',
                margin      : '0 5 0 0',
                iconCls     : 'icon-edit',
                text        : 'Edit',
                bindAction  : me.bindPrefixName + 'Update'
            }, {
                xtype       : 'button',
                action      : 'destroy',
                disabled    : true,
                hidden      : true,
                itemId      : 'btnDelete',
                bindAction  : me.bindPrefixName + 'Delete',
                iconCls     : 'icon-delete',
                text        : 'Delete Selected'
            }, {
                xtype       : 'button',
                action      : 'print',
                hidden      : true,
                itemId      : 'btnPrint',
                margin      : '0 5 0 0',
                bindAction  : me.bindPrefixName + 'Print',
                iconCls     : 'icon-print',
                text        : 'Print / Save'
            }]
        }, {
            xtype       : 'pagingtoolbar',
            dock        : 'bottom',
            width       : 360,
            displayInfo : true,
            store       : this.getStore()
        }];

        return dockedItems;
    },
    generateActionColumn : function() {
        var me = this;
        var ac = {
            xtype       : 'actioncolumn',
            hidden      : true,
            itemId      : 'actioncolumn',
            width       : 50,
            resizable   : false,
            align       : 'right',
            hideable    : false,
            items       : [{
                text        : 'Edit',
                iconCls     : 'icon-edit',
                bindAction  : me.bindPrefixName + 'Update',
                altText     : 'Edit',
                tooltip     : 'Edit'
            }, {
                text        : 'Delete',
                iconCls     : 'icon-delete',
                bindAction  : me.bindPrefixName + 'Delete',
                altText     : 'Delete',
                tooltip     : 'Delete'
            }]
        };
        
        return ac;
    }
});