Ext.define('Erems.library.template.view.FdUnitInformationfpk', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.templateviewfdunitinformationfpk',
    itemId: 'TemplateViewFdUnitInformationfpk',
    bodyPadding: 10,
    title: 'UNIT INFORMATION',
    collapsible: true,
    fieldNamePrefix: '_pl',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
              
                {
                    layout: 'hbox',
                    padding: '10px 0 0 0',
                    bodyStyle: 'border:0px',
                    width: '100%',
                    items: [
                        {
                            xtype: 'panel', flex: 8,
                            layout: {
                                type: 'vbox',
                                defaultMargins: {top: 0, right: 0, bottom: 10, left: 0}
                            },
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    width: '100%',
                                    items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'Kawasan / Cluster',
                                            anchor: '-5',
                                            name: 'unit_cluster_code'+me.fieldNamePrefix,
                                            flex: 5,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                        }, {
                                            xtype: 'splitter', width: 5,
                                        },
                                        {
                                            xtype: 'clustercombobox',
                                            itemId: 'fd_clustercb',
                                            fieldLabel: '',
                                            anchor: '-5',
                                            name: 'unit_cluster_id'+me.fieldNamePrefix,
                                            flex: 6,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                        }
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    width: '100%',
                                    items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'Block name',
                                            anchor: '-5',
                                            name: 'unit_block_code'+me.fieldNamePrefix,
                                            flex: 5,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                        }, {
                                            xtype: 'splitter', width: 5,
                                        }, {
                                            xtype: 'blockcombobox',
                                            itemId: 'fd_blockcb',
                                            fieldLabel: '',
                                            anchor: '-5',
                                            name: 'unit_block_id'+me.fieldNamePrefix,
                                            flex: 6,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                        }]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    width: '100%',
                                    items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'PT',
                                            anchor: '-5',
                                            name: 'pt_name'+me.fieldNamePrefix,
                                            flex: 1,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                        }]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    width: '100%',
                                    items: [{
                                            xtype: 'combobox',
                                            fieldLabel: 'Kavling / Unit No. ',
                                            anchor: '-5',
                                            name: 'unit_unit_number'+me.fieldNamePrefix,
                                            flex: 6,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                        }, {
                                            xtype: 'splitter', width: 5,
                                        }, {
                                            xtype: 'button',
                                            text: 'Browse Unit',
                                            itemId: 'fd_browse_unit_btn'+me.fieldNamePrefix,
                                            padding: '2px 5px',
                                            action: 'browse_unit'+me.fieldNamePrefix,
                                            iconCls: 'icon-search',
                                            style: 'background-color:#FFC000;'
                                        },
                                        {xtype: 'label', text: '', flex: 2}]
                                }
                            ]
                        },
                        {xtype: 'splitter', width: 30},
                        {
                            xtype: 'panel', flex: 7,
                            layout: {
                                type: 'vbox',
                                defaultMargins: {top: 0, right: 0, bottom: 10, left: 0}
                            },
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    width: '100%',
                                    items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'Product Category',
                                            anchor: '-5',
                                            name: 'unit_productcategory'+me.fieldNamePrefix,
                                            flex: 1,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                        }]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    width: '100%',
                                    items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'Type',
                                            anchor: '-5',
                                            name: 'unit_type_name'+me.fieldNamePrefix,
                                            flex: 1,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                        }]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    width: '100%',
                                    items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'Land Size',
                                            anchor: '-5',
                                            name: 'unit_land_size'+me.fieldNamePrefix,
                                            flex: 12,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                        },
                                        {xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'},
                                        {
                                            xtype: 'splitter', width: 30,
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: 'Long',
                                            anchor: '-5',
                                            name: 'unit_long'+me.fieldNamePrefix,
                                            flex: 6,
                                            labelWidth: 30,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                        },
                                        {xtype: 'label', text: 'm', flex: 1, margin: '0 0 0 10px'}
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    width: '100%',
                                    items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'Building Size',
                                            anchor: '-5',
                                            name: 'unit_building_size'+me.fieldNamePrefix,
                                            flex: 12,
                                            readOnly: true,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                        },
                                        {xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'},
                                        {
                                            xtype: 'splitter', width: 30,
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: 'Width',
                                            anchor: '-5',
                                            name: 'unit_width'+me.fieldNamePrefix,
                                            flex: 6,
                                            labelWidth: 30,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                        },
                                        {xtype: 'label', text: 'm', flex: 1, margin: '0 0 0 10px'}
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    width: '100%',
                                    items: [{
                                            xtype: 'textfield',
                                            fieldLabel: 'Kelebihan Tanah',
                                            anchor: '-5',
                                            name: 'unit_kelebihan'+me.fieldNamePrefix,
                                            flex: 12,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                        },
                                        {xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'},
                                        {
                                            xtype: 'splitter', width: 30,
                                        }, {
                                            xtype: 'textfield',
                                            fieldLabel: 'Floor',
                                            anchor: '-5',
                                            name: 'unit_floor'+me.fieldNamePrefix,
                                            flex: 6,
                                            labelWidth: 30,
                                            fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                        },
                                        {xtype: 'label', text: '', flex: 1, margin: '0 0 0 10px'}
                                    ]
                                }
                            ]
                        }
                    ]
                }

            ]
        });

        me.callParent(arguments);
    }

});