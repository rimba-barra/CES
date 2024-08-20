Ext.define('Erems.view.townplanning.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.townplanningformdata',
    
    requires: ['Erems.template.ComboBoxFields','Erems.view.townplanning.GridUnitHistory'],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    height: 500,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    editedRow: -1,
    initComponent: function() {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        var gg = Ext.create('Ext.data.Store', {
            fields: ['name', 'value'],
            data: [
            {"name": "SEMUA", "value": "SEMUA"},
            {"name": "GANJIL", "value": "GANJIL"},
            {"name": "GENAP", "value": "GENAP"}
            ]
        });

        Ext.applyIf(me, {
            fieldDefaults: {
                // labelAlign: 'left',
                msgTarget: 'side',
                labelSeparator: ''
            },
            items: [{xtype: 'panel', bodyPadding: 10, title: 'GENERAL INFORMATION',
            items: [{layout: 'hbox', bodyStyle: 'border:0px',
            items: [{xtype: 'label',
            flex: 1
        }, {
            flex: 2,
            bodyPadding: 10,
            layout: 'hbox',
            bodyStyle: 'background-color:#FFFF99;border:0px',
            items: [{
                xtype: 'hiddenfield',
                itemId: 'fd_unit_id',
                name: 'unit_id'
            }, {
                xtype: 'hiddenfield',
                itemId: 'fd_state_administrative',
                name: 'state_administrative'
            }, {
                xtype: 'hiddenfield',
                itemId: 'fd_progress',
                name: 'progress',
                value: 0
            }, {
                xtype: 'textfield',
                fieldLabel: 'Status',
                labelWidth: 35,
                itemId: 'fd_state_administrative_text',
                name: 'unitstatus_status',
                value: 'AVAILABLE',
                readOnly: true,
                flex: 4,
                fieldStyle: 'background-color:#FFCC00;background-image: none;'

            }, {
                xtype: 'splitter', width: 5,
            }, {
                xtype: 'textfield',
                fieldLabel: 'Const. Progress',
                name: 'progress_text',
                value: '0',
                margin:'0 0 0 20px',
                flex:2,
                readOnly: true,
                fieldStyle: 'background-color:#FFCC00;background-image: none;'
            },{
                xtype:'label',
                text:'%',
                width:20,
                padding:'5px 0 0 0',
                margin:'0 0 0 10px'
            }]
        }]},
        {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                            {
                               xtype:'textfield',
                               name:'cluster_code',
                               allowBlank: false,
                               fieldLabel:'Kawasan/Cluster',
                               margin:'0 5px 0 0',
                               width:200
                           },

                           {
                            xtype: 'combobox',
                            queryMode:'local',
                            fieldLabel: '',
                            displayField: cbf.cluster.d,
                            valueField: cbf.cluster.v,
                            name: 'cluster_cluster_id',
                            flex: 3

                        }, {
                            xtype: 'splitter', width: 5,
                        }, {
                            xtype: 'button',
                            flex: 1,
                            action: 'add_cluster',
                            text: 'Create Cluster'
                        }]
                    }, {
                            // bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            name:'pt_id_body', // added by rico 08032023
                            items: [{
                                xtype: 'combobox',
                                queryMode:'local',
                                displayField: cbf.pt.d,
                                valueField: cbf.pt.v,
                                allowBlank: false,
                                fieldLabel: 'PT',
                                name: 'pt_pt_id',
                                flex: 3

                            }, {
                                xtype: 'splitter', width: 5,
                            }, {
                                xtype: 'label',
                                flex: 1
                            }]
                        }, 
                        {
                            // bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [{
                             xtype: 'checkboxfield',
                             fieldLabel: 'Fasilitas Umum',
                             itemId: 'is_fasum',											
                             name: 'is_fasum',
                             boxLabel: '(Additional for Surabaya)',
                             inputValue: '1',
                             uncheckedValue: '0'
                         }]
                     }, 
                     {
                            // bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            name: 'tanahcode',
                            hidden: true,
                            items: [{
                                xtype: 'combobox',
                                queryMode:'local',
                                displayField: cbf.tanahcode.d,
                                valueField: cbf.tanahcode.v,
                                fieldLabel: 'Kode Tanah',
                                name: 'tanahcode_pt_id',
                                flex: 3

                            }, {
                                xtype: 'splitter', width: 5,
                            }, {
                                xtype: 'label',
                                flex: 1
                            }]
                        },
                        {
                            // bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [{
                                xtype: 'fieldcontainer',
                                combineErrors: true,
                                padding: '10px 0 0 0',
                                layout: 'hbox',
                                flex: 3,
                                defaults: {
                                    hideLabel: true
                                },
                                items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    name: 'unit_number',
                                    fieldLabel: 'Kavling Number',
                                    allowBlank: false,
                                    hideLabel: false
                                }, {
                                    xtype: 'splitter', width: 5,
                                }, {
                                    xtype: 'textfield',
                                    flex: 1,
                                    name: 'number_end',
                                    fieldLabel: 'number_end',
                                    itemId: 'fd_number_end',
                                    readOnly: true,
                                    allowBlank: true,
                                    margins: '0'
                                }, {
                                    xtype: 'splitter', width: 5,
                                },
                                {
                                    //the width of this field in the HBox layout is set directly
                                    //the other 2 items are given flex: 1, so will share the rest of the space

                                    xtype: 'combobox',
                                    store: gg,
                                    queryMode: 'local',
                                    displayField: 'name',
                                    valueField: 'value',
                                    name: 'mode_number_generator',
                                    fieldLabel: 'number_generator',
                                    readOnly: true
                                }]
                            }, {
                                xtype: 'splitter', width: 5,
                            }, {
                                xtype: 'checkboxfield',
                                itemId: 'fd_number_check',
                                labelAlign: 'left',
                                fieldLabel: 'Create more than one ',
                                name: 'number_check',
                                width:150,
                                inputValue: '1',
                                uncheckedValue: '0'
                            }]
                        },
                        ]
                    },
                    /* HOUSE TYPE */
                    {xtype: 'panel', title: 'HOUSE TYPE', bodyPadding: 10,itemId:'houseTypeID',
                    items: [ {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                            {
                               xtype:'textfield',
                               name:'type_code',
                               fieldLabel: 'Type',
                               margin:'0 5px 0 0',
                               width:200
                           },
                           {
                            xtype: 'combobox',
                            queryMode:'local',
                                   // typeAhead:true,
                                   displayField: cbf.type.d,
                                   valueField: cbf.type.v,
                                   fieldLabel: '',
                                   name: 'type_type_id',
                                   flex: 3

                               }, {
                                xtype: 'splitter', width: 5,
                            }, {
                                xtype: 'button',
                                flex: 1,
                                action:'add_type',
                                text: 'Create Type'
                            }]
                        },{
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                            {
                               xtype:'textfield',
                               name:'productcategory_code',
                               allowBlank: false,
                               readOnly:true,
                               keepRO:true,
                               fieldLabel: 'Product Category',
                               margin:'0 5px 0 0',
                               width:200
                           },
                           {
                            xtype: 'combobox',
                            queryMode:'local',
                            allowBlank: false,
                            readOnly:true,
                            keepRO:true,
                            displayField: cbf.productcategory.d,
                            valueField: cbf.productcategory.v,
                            fieldLabel: '',
                            name: 'productcategory_productcategory_id',
                            flex: 3

                        }, {
                            xtype: 'splitter', width: 5,
                        }, 
                                /*{
                                    xtype: 'button',
                                    disabled:true,
                                    hidden:true,
                                    flex: 1,
                                    action: 'add_category',
                                    text: 'Create Category'
                                },*/
                                {
                                    xtype: 'label',
                                    text:'',

                                    flex: 1,
                                }]
                            },{
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                            {
                               xtype:'textfield',
                               name:'purpose_code',
                               allowBlank: false,
                               fieldLabel: 'Purpose use',
                               margin:'0 5px 0 0',
                               width:200
                           },
                           {
                            xtype: 'combobox',
                            queryMode:'local',
                            fieldLabel: '',
                            displayField: cbf.purpose.d,
                            valueField: cbf.purpose.v,
                            name: 'purpose_purpose_id',
                            itemId: 'fd_purpose_id',
                            flex: 3

                        }
                                // , {
                                //     xtype: 'splitter', width: 5,
                                // }, {
                                //     xtype: 'button',
                                //     flex: 1,
                                //     action:'add_purpose',
                                //     text: 'Create Purpose'
                                // }
                                ]
                            }, {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [{
                                xtype: 'numberfield',
                                minValue: 0,
                                fieldLabel: 'Land Size',
                                anchor: '-5',
                                name: 'land_size',
                                name: 'land_size',
                                value: 0,
                                flex: 4
                            }, {xtype: 'label',
                            flex: 1,
                            text: 'm2',
                            padding: '0 0 0 10px'
                        }, {
                            xtype: 'splitter', width: 5,
                        }, {
                            xtype: 'numberfield',
                            minValue: 0,
                            fieldLabel: 'Building Size',
                            anchor: '-5',
                            name: 'building_size',
                            itemId: 'fd_building_size',
                            value: 0,
                            flex: 4
                        }, {
                            xtype: 'label',
                            flex: 1,
                            text: 'm2',
                            padding: '0 0 0 10px'
                        }]
                    }, {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [{
                                xtype: 'numberfield',
                                minValue: 0,
                                fieldLabel: 'Floor (Jumlah Lantai)',
                                anchor: '-5',
                                name: 'floor',
                                itemId: 'fd_floor',
                                value: 0,
                                flex: 4
                            }, {xtype: 'label',
                            flex: 1,
                            text: '',
                            padding: '0 0 0 10px'
                        }, {
                            xtype: 'splitter', width: 5,
                        }, {
                            xtype: 'numberfield',
                            allowBlank: false,
                            minValue: 0,
                            fieldLabel: 'Floor Size',
                            anchor: '-5',
                            name: 'floor_size',
                            itemId: 'fd_floor_size',
                            value: 0,
                            flex: 4
                        }, {
                            xtype: 'label',
                            flex: 1,
                            text: 'm2',
                            padding: '0 0 0 10px'
                        }]
                    }, {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [{
                                xtype: 'numberfield',
                                minValue: 0,
                                fieldLabel: 'Bedroom',
                                anchor: '-5',
                                name: 'bedroom',
                                itemId: 'fd_bedroom',
                                value: 0,
                                flex: 4
                            }, {xtype: 'label',
                            flex: 1,
                            text: '',
                            padding: '0 0 0 10px'
                        }, {
                            xtype: 'splitter', width: 5,
                        }, {
                            xtype: 'numberfield',
                            minValue: 0,
                            fieldLabel: 'Bathroom',
                            anchor: '-5',
                            name: 'bathroom',
                            itemId: 'fd_bathroom',
                            value: 0,
                            flex: 4
                        }, {
                            xtype: 'label',
                            flex: 1,
                            text: '',
                            padding: '0 0 0 10px'
                        }]
                    }, {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [{
                                xtype: 'numberfield',
                                minValue: 0,
                                fieldLabel: 'Width',
                                anchor: '-5',
                                name: 'width',
                                itemId: 'fd_width',
                                value: 0,
                                flex: 4
                            }, {xtype: 'label',
                            flex: 1,
                            text: 'm',
                            padding: '0 0 0 10px'
                        }, {
                            xtype: 'splitter', width: 5,
                        }, {
                            xtype: 'numberfield',
                            minValue: 0,
                            fieldLabel: 'Long',
                            anchor: '-5',
                            name: 'long',
                            itemId: 'fd_long',
                            value: 0,
                            flex: 4
                        }, {
                            xtype: 'label',
                            flex: 1,
                            text: 'm',
                            padding: '0 0 0 10px'
                        }]
                    }, {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [{
                                xtype: 'numberfield',
                                minValue: 0,
                                fieldLabel: 'Kelebihan Tanah',
                                anchor: '-5',
                                name: 'kelebihan',
                                itemId: 'fd_kelebihan_tanah',
                                value: 0,
                                flex: 4
                            }, {xtype: 'label',
                            flex: 1,
                            text: 'm2',
                            padding: '0 0 0 10px'
                        }, {
                            xtype: 'splitter', width: 5,
                        }, {
                            xtype: 'numberfield',
                            minValue: 0,
                            fieldLabel: 'Electricity',
                            anchor: '-5',
                            name: 'electricity',
                            itemId: 'fd_electricity',
                            value: 0,
                            flex: 4
                        }, {
                            xtype: 'label',
                            flex: 1,
                            text: 'watt',
                            padding: '0 0 0 10px'
                        }]
                    }]
                },
                /** ADDITIONAL INFORMATION */
                {xtype: 'panel', bodyPadding: 10, title: 'ADDITIONAL INFORMATION',
                items: [{
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                            {
                               xtype:'textfield',
                               name:'block_code',
                               allowBlank: false,
                               fieldLabel: 'Block name',
                               margin:'0 5px 0 0',
                               width:200
                           },
                           {
                            xtype: 'combobox',
                            queryMode:'local',
                            fieldLabel: '',
                            displayField: cbf.block.d,
                            valueField: cbf.block.v,
                            name: 'block_block_id',
                            flex: 3

                        }, {
                            xtype: 'splitter', width: 5,
                        }, {
                            xtype: 'button',
                            flex: 1,
                            action:'add_block',
                            text: 'Create Block'
                        }]
                    }, {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                            {
                               xtype:'textfield',
                               name:'position_code',
                               allowBlank: false,
                               fieldLabel: 'Position',
                               margin:'0 5px 0 0',
                               width:200
                           },
                           {
                            xtype: 'combobox',
                            queryMode:'local',
                            fieldLabel: '',
                            displayField: cbf.position.d,
                            valueField: cbf.position.v,
                            name: 'position_position_id',
                            flex: 3

                        }, {
                            xtype: 'splitter', width: 5,
                        }, {
                            xtype: 'button',
                            flex: 1,
                            action:'add_position',
                            text: 'Create Position'
                        }]
                    }, {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                            {
                               xtype:'textfield',
                               name:'side_code',
                               allowBlank: false,
                               fieldLabel: 'Side direction',
                               margin:'0 5px 0 0',
                               width:200
                           },
                           {
                            xtype: 'combobox',
                            queryMode:'local',
                            fieldLabel: '',
                            displayField: cbf.side.d,
                            valueField: cbf.side.v,
                            name: 'side_side_id',
                            flex: 3

                        }, {
                            xtype: 'splitter', width: 5,
                        }, {
                            xtype: 'button',
                            flex: 1,
                            action:'add_side',
                            text: 'Create Side'
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        padding: '10px 0 0 0',
                        fieldLabel: '&nbsp;',
                        fieldSeparator: '',
                        layout: 'vbox',
                        items: [
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: 'HOOK diperhitungkan',
                            labelWidth: 150,
                            itemId: 'fd_is_hookcalculated',
                            name: 'is_hookcalculated',
                            inputValue: '1',
                            uncheckedValue: '0'
                        }, {
                            xtype: 'checkboxfield',
                            fieldLabel: 'Taman diperhitungkan ',
                            itemId: 'fd_is_tamancalculated',
                            name: 'is_tamancalculated',
                            labelWidth: 150,
                            inputValue: '1',
                            uncheckedValue: '0'
                        }

                        ]
                    }]
                },
                {
                    xtype       : 'panel', 
                    bodyPadding : 10, 
                    title       : 'OTHER INFORMATION',
                    id          :'TPOtherInformationID',
                    collapsible : true,
                    collapsed   : true,
                    // html        : '',
                },
                {
                    xtype       : 'panel', 
                    bodyPadding : 10, 
                    title       : 'UPLOAD IMAGE',
                    id          :'TPUploadimageID',
                    collapsible : true,
                    collapsed   : true,
                    // html        : '',
                },
                /* GARIS SEPADAN BANGUNAN */
                {xtype: 'panel', bodyPadding: 10, title: 'GARIS SEPADAN BANGUNAN',
                items: [{
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [{
                                xtype: 'numberfield',
                                minValue: 0,
                                value: 0,
                                fieldLabel: 'Depan',
                                anchor: '-5',
                                name: 'depan',
                                flex: 4
                            }, {xtype: 'label',
                            flex: 1,
                            text: 'm',
                            padding: '0 0 0 10px'
                        }, {
                            xtype: 'splitter', width: 5,
                        }, {
                            xtype: 'numberfield',
                            minValue: 0,
                            value: 0,
                            fieldLabel: 'Belakang',
                            anchor: '-5',
                            name: 'belakang',
                            flex: 4
                        }, {
                            xtype: 'label',
                            flex: 1,
                            text: 'm',
                            padding: '0 0 0 10px'
                        }]
                    }, {
                            //  bodyPadding: 10,
                            padding: '10px 0 0 0',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [{
                                xtype: 'numberfield',
                                minValue: 0,
                                value: 0,
                                fieldLabel: 'Samping',
                                anchor: '-5',
                                name: 'samping',
                                flex: 4
                            }, {xtype: 'label',
                            flex: 1,
                            text: 'm',
                            padding: '0 0 0 10px'
                        }, {
                            xtype: 'splitter', width: 5,
                        }, {
                            xtype: 'numberfield',
                            minValue: 0,
                            value: 0,
                            maxValue: 100,
                            fieldLabel: 'Konsep Dasar Bangunan',
                            anchor: '-5',
                            itemId: 'fd_konsepdasar',
                            name: 'konsepdasar',
                            flex: 4
                        }, {
                            xtype: 'label',
                            flex: 1,
                            text: '%',
                            padding: '0 0 0 10px'
                        }]
                    }, {
                        xtype      : 'xnotefieldEST',
                        padding    : '10px 0 0 0',
                        fieldLabel : 'Description',
                        name       : 'description',
                        width      : '100%',
                        labelWidth : 30
                    }]
                },
                {xtype: 'panel', bodyPadding: 10, title: 'CATATAN PERUBAHAN',
                itemId:'catatanPerubahanPanelId',
                hidden:true,
                items: [
                {
                    xtype            : 'xnotefieldEST',
                    padding          : '10px 0 0 0',
                    fieldLabel       : 'Description',
                    name             : 'unithistory_description',
                    width            : '100%',
                },
                {
                    padding: '10px 0 0 0',
                    xtype: 'textfield',
                    fieldLabel: 'Instruksi Order',
                    name: 'unithistory_instruksi_order',
                    width: '100%',
                    maskRe:/[A-Za-z0-9\s.]/,
                    enforceMaxLength:true,
                    maxLength:50
                },
                {
                    padding: '10px 0 0 0',
                    xtype: 'textfield',
                    fieldLabel: 'Person In Charge',
                    name: 'unithistory_person_in_charge',
                    readOnly:true,
                    keepRO:true,
                    width: '100%'
                },
                {
                    xtype:'townplanninggridunithistory',
                    height:200
                }

                ]
            }
            ],
            dockedItems: me.generateDockedItem()
        });

me.callParent(arguments);
},
generateDockedItem: function() {
    var x = [
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
            action: 'save',
            itemId: 'btnSave',
            hidden:true,
            padding: 5,
            width: 75,
            iconCls: 'icon-save',
            text: 'Save'
        },
        {
            xtype: 'button',
            action: 'cancel',
            itemId: 'btnCancel',
            padding: 5,
            width: 75,
            iconCls: 'icon-cancel',
            text: 'Cancel',
            handler: function() {
                this.up('window').close();
            }
        }
        ]
    }
    ];
    return x;
}
});