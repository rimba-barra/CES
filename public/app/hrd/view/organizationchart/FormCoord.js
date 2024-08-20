Ext.define('Hrd.view.organizationchart.FormNode', {
    alias: 'widget.organizationchartformnode',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    deletedData: {},
    initComponent: function () {
        var me = this;
      //  var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {},
            items: [   
                {
                    xtype: 'hiddenfield',
                    itemId: 'fd_position_id',
                    id: 'fd_position_id',
                    name: 'fd_position_id'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Position',
                            itemId: 'fd_position',
                            id: 'fd_position',
                            name: 'fd_position',
                            width: 400,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'button',
                            name: 'browse_position',
                            text: 'Browse', 
                            action: 'lookupposition'
                        }
                    ]
                },   
                {
                    xtype: 'hiddenfield',
                    itemId: 'fd_parent_id',
                    id: 'fd_parent_id',
                    name: 'fd_parent_id'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Parent',
                            itemId: 'fd_parentdescription',
                            id: 'fd_parentdescription',
                            name: 'fd_parentdescription',
                            width: 400,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'button',
                            name: 'browse_position',
                            text: 'Browse', 
                            action: 'lookupparent'
                        }
                    ]
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'No',
                    itemId: 'fd_order_no',
                    id: 'fd_order_no',
                    name: 'fd_order_no'
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Level',
                    itemId: 'fd_orglevel',
                    id: 'fd_orglevel',
                    name: 'fd_orglevel'
                },
                {
                    fieldLabel: '',
                    xtype: 'checkbox', 
                    boxLabel: 'Entity between entity', 
                    name: 'fd_isbetween'
                },
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});