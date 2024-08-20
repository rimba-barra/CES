Ext.define('Erems.view.mastertype.FormData', {
    extend   : 'Erems.library.template.view.FormData',
    alias    : 'widget.mastertypeformdata',
    requires : [
        'Erems.view.mastertype.TypeAttributeGrid',
        'Erems.library.template.component.Buildingclasscombobox',
        'Erems.library.template.component.Salesgroupcombobox',
        'Erems.library.template.view.combobox.Cluster2',
        'Erems.library.template.view.combobox.Productcategory','Erems.template.ComboBoxFields'
    ],
    frame         : true,
    autoScroll    : true,
    anchorSize    : 100,
    bodyBorder    : true,
    bodyPadding   : 10,
    height        : 600,
    itemId        : "MasterTypeFormDataId",
    bodyStyle     : 'border-top:none;border-left:none;border-right:none;',
    initComponent : function() {
        var me  = this;
        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults : {
                labelAlign     : 'left',
                labelSeparator : ' ',
                labelClsExtra  : 'small',
                fieldStyle     : 'margin-bottom:3px;',
                anchor         : '100%'
            },
            items: [
                {
                    xtype  : 'hidden',
                    itemId : 'fdms_id',
                    name   : 'type_id'
                },
                {
                    xtype            : 'textfield',
                    itemId           : 'fdms_code',
                    name             : 'code',
                    fieldLabel       : 'Type Code',
                    allowBlank       : false,
                    enforceMaxLength : true,
                    maskRe           : /[A-Za-z0-9\s.]/,
                    minLength        : 2,
                    maxLength        : 10,
                    anchor           : '-400',
                    listeners        : {
                        blur:function(el, v, prev){
                            if(el.value != 'undefined'){
                                if(el.value.length < 2){
                                    Ext.Msg.show({
                                        title   : 'Information',
                                        msg     : 'Type Code minimal 2 karakter',
                                        icon    : Ext.Msg.INFO,
                                        buttons : Ext.Msg.OK
                                    });
                                    el.setValue('');
                                }
                                else if(el.value.length > 10){
                                    Ext.Msg.show({
                                        title   : 'Information',
                                        msg     : 'Type Code maximal 10 karakter',
                                        icon    : Ext.Msg.INFO,
                                        buttons : Ext.Msg.OK
                                    });
                                    el.setValue(prev);
                                }
                            }
                        }
                    }
                }, 
                {
                    xtype    : 'cbproductcategory',
                    itemId   : 'fd_mastertype_productcategory',
                    name     : 'productcategory_productcategory_id',
                    anchor   : '-400',
                    editable : false

                }, {
                    xtype      : 'cbcluster2',
                    itemId     : 'fd_mastertype_cluster',
                    name       : 'cluster_cluster_id',
                    anchor     : '-400',
                    fieldLabel : 'Cluster (Kawasan)',
                    editable   : false
                },
                {
                    xtype        : 'combobox',
                    queryMode    :'local',
                    fieldLabel   : '',
                    displayField : cbf.purpose.d,
                    valueField   : cbf.purpose.v,
                    name         : 'purpose_id',
                    fieldLabel   : 'Purpose',
                    itemId       : 'fd_purpose_id',
                    anchor       : '-400',
                }, 
                {
                    xtype            : 'textfield',
                    itemId           : 'fd_mastertype_name',
                    name             : 'name',
                    fieldLabel       : 'Type name',
                    allowBlank       : true,
                    enforceMaxLength : true,
                    maskRe           : /[^\`\"\']/,
                    maxLength        : 50,
                    anchor           : '-400'
                }, 
                {
                    xtype    : 'fieldcontainer',
                    defaults : {
                        labelAlign     : 'left',
                        labelSeparator : ' ',
                        labelClsExtra  : 'small',
                        fieldStyle     : 'margin-bottom:3px;',
                        anchor         : '50%',
                        columnWidth    : 0.50,
                        margin         : '0 30 10 0'
                    },
                    layout         : { type: 'column' },
                    labelSeparator : ' ',
                    items          : [
                        {
                            xtype  : 'container',
                            layout : 'hbox',
                            items  : [
                                {
                                    xtype            : 'numberfield',
                                    itemId           : 'fd_mastertype_landsize',
                                    name             : 'land_size',
                                    fieldLabel       : 'Land Size',
                                    allowBlank       : true,
                                    enforceMaxLength : true,
                                    maskRe           : /[^\`\"\']/,
                                    maxLength        : 9,
                                    flex             : 1,
                                    minValue         : 0,
                                    value            : 0,
                                },
                                {
                                    xtype: 'label',
                                    text: ' m2',
                                    margin: '0 0 0 5',
                                    width: 150
                                }
                            ]
                        },
                        {
                            xtype  : 'container',
                            layout : 'hbox',
                            items  : [
                                {
                                    xtype            : 'numberfield',
                                    itemId           : 'fd_mastertype_building_size',
                                    name             : 'building_size',
                                    fieldLabel       : 'Building size',
                                    allowBlank       : true,
                                    enforceMaxLength : true,
                                    maskRe           : /[^\`\"\']/,
                                    maxLength        : 9,
                                    minValue         : 0,
                                    flex             : 1,
                                    value            : 0
                                },
                                {
                                    xtype  : 'label',
                                    text   : ' m2',
                                    margin : '0 0 0 5',
                                    width  : 150
                                }
                            ]
                        },
                        {
                            xtype  : 'container',
                            layout : 'hbox',
                            items  : [
                                {
                                    xtype            : 'numberfield',
                                    itemId           : 'fd_mastertype_floor',
                                    name             : 'floor',
                                    fieldLabel       : 'Floor<br>(Jumlah lantai)',
                                    allowBlank       : false,
                                    enforceMaxLength : true,
                                    maskRe           : /[^\`\"\']/,
                                    maxLength        : 9,
                                    minValue         : 0,
                                    flex             : 1,
                                    value            : 0
                                },
                                {
                                    xtype  : 'label',
                                    text   : ' ',
                                    margin : '0 0 25 5',
                                    width  : 150
                                }
                            ]
                        },
                        {
                            xtype  : 'container',
                            layout : 'hbox',
                            items  : [
                                {
                                    xtype            : 'numberfield',
                                    itemId           : 'fd_mastertype_floor_size',
                                    name             : 'floor_size',
                                    fieldLabel       : 'Floor size',
                                    allowBlank       : true,
                                    enforceMaxLength : true,
                                    maskRe           : /[^\`\"\']/,
                                    maxLength        : 9,
                                    flex             : 1,
                                    minValue         : 0,
                                    value            : 0
                                },
                                {
                                    xtype  : 'label',
                                    text   : ' m2',
                                    margin : '0 0 25 5',
                                    width  : 150
                                }
                            ]
                        },
                        {
                            xtype  : 'container',
                            layout : 'hbox',
                            items  : [
                                {
                                    xtype            : 'numberfield',
                                    itemId           : 'fd_mastertype_bedroom',
                                    name             : 'bedroom',
                                    fieldLabel       : 'Bedroom',
                                    allowBlank       : true,
                                    enforceMaxLength : true,
                                    maskRe           : /[^\`\"\']/,
                                    maxLength        : 50,
                                    flex             : 1,
                                    minValue         : 0,
                                    value            : 0
                                },
                                {
                                    xtype  : 'label',
                                    text   : ' ',
                                    margin : '0 0 0 5',
                                    width  : 150
                                }

                            ]
                        },
                        {
                            xtype  : 'container',
                            layout : 'hbox',
                            items  : [
                                {
                                    xtype            : 'numberfield',
                                    itemId           : 'fd_mastertype_bathroom',
                                    name             : 'bathroom',
                                    fieldLabel       : 'Bathroom',
                                    allowBlank       : true,
                                    enforceMaxLength : true,
                                    maskRe           : /[^\`\"\']/,
                                    maxLength        : 50,
                                    minValue         : 0,
                                    flex             : 1,
                                    value            : 0
                                },
                                {
                                    xtype  : 'label',
                                    text   : ' ',
                                    margin : '0 0 0 5',
                                    width  : 150
                                }
                            ]
                        },
                        {
                            xtype  : 'container',
                            layout : 'hbox',
                            items  : [
                                {
                                    xtype            : 'numberfield',
                                    itemId           : 'fd_mastertype_electricity',
                                    name             : 'electricity',
                                    fieldLabel       : 'Electricity',
                                    allowBlank       : false,
                                    enforceMaxLength : true,
                                    maskRe           : /[^\`\"\']/,
                                    maxLength        : 50,
                                    minValue         : 0,
                                    flex             : 1,
                                    value            : 0,
                                },
                                {
                                    xtype  : 'label',
                                    text   : ' watt',
                                    margin : '0 0 0 5',
                                    width  : 150
                                }
                            ]
                        }
                    ]
                }, 
                {
                    xtype      : 'buildingclasscombobox',
                    itemId     : 'fd_mastertype_buildingclass',
                    name       : 'building_class',
                    anchor     : '-400',
                    fieldLabel : 'Building Class',
                    editable   : false
                }, 
                {
                    xtype      : 'salesgroupcombobox',
                    itemId     : 'fd_mastertype_salesgroup',
                    name       : 'salesgroup',
                    anchor     : '-400',
                    fieldLabel : 'Sales group',
                    editable   : false
                },
                {
                    xtype      : 'xnotefieldEST',
                    height     : 60,
                    itemId     : 'fdms_description',
                    name       : 'description',
                    fieldLabel : 'Description',
                    anchor     : '-100'
                }, 
                {
                    xtype    : 'fieldcontainer',
                    defaults : {
                        labelAlign     : 'left',
                        labelSeparator : ' ',
                        labelClsExtra  : 'small',
                        fieldStyle     : 'margin-bottom:3px;',
                        anchor         : '50%',
                        columnWidth    : 0.50,
                        margin         : '0 30 10 0'
                    },
                    layout         : { type: 'column' },
                    labelSeparator : ' ',
                    items          : [
                        {
                            xtype  : 'container',
                            layout : 'hbox',
                            items  : [
                                {
                                    xtype      : 'xdatefield',
                                    itemId     : 'fd_launching_start',
                                    name       : 'launching_start',
                                    fieldLabel : 'Launching Start',
                                    editable   : false,
                                },
                            ]
                        },
                        {
                            xtype  : 'container',
                            layout : 'hbox',
                            items  : [
                                {
                                    xtype      : 'xdatefield',
                                    itemId     : 'fd_launching_end',
                                    name       : 'launching_end',
                                    fieldLabel : 'Launching End',
                                    editable   : false,
                                },
                            ]
                        },
                    ]
                },
                {
                    xtype  : 'fieldset',
                    height : 250,
                    title  : 'Detail Attribute',
                    items  : [
                        {xtype: 'typeattributegrid', itemId: 'detailmastertype_grid'}
                    ]
                },
                {
                    xtype     : 'fieldset',
                    maxHeight : 400,
                    height    : 'auto',
                    title     : 'Floor Plan',
                    defaults  : {
                        labelAlign     : 'left',
                        labelSeparator : ' ',
                        labelClsExtra  : 'small',
                        fieldStyle     : 'margin-bottom:3px;',
                        anchor         : '50%',
                        columnWidth    : 0.50,
                        margin         : '0 20 0 0'
                    },
                    layout         : { type: 'column' },
                    labelSeparator : ' ',
                    items  : [
                        {
                            xtype  : 'container',
                            layout : 'vbox',
                            items  : [
                                {
                                    xtype : 'hiddenfield',
                                    name : 'floorplan_leftaccess',
                                },
                                {
                                    xtype      : 'filefield',
                                    fieldLabel : 'Left Access',
                                    labelWidth : '10%',
                                    padding    : '0 0 5px 0',
                                    itemId     : 'fd_file_left',
                                    name       : 'file_floorplan_leftaccess',
                                    emptyText  : 'Select File',
                                    buttonOnly : true,
                                    listeners  : {
                                        afterrender : function(cmp){
                                            cmp.fileInputEl.set({
                                                accept : 'image/*'
                                            });
                                        }
                                    }
                                },
                                {
                                    xtype     : 'image',
                                    width     : 320,
                                    style     : "border: 1px solid rgb(181 184 200)",
                                    bodyStyle : 'background:none',
                                    itemId    : 'file_image_left',
                                    name      : 'file_image_left',
                                    maxHeight : 350,
                                    height    : 'auto'
                                }
                            ]
                        },
                        {
                            xtype  : 'container',
                            layout : 'vbox',
                            items  : [
                                {
                                    xtype : 'hiddenfield',
                                    name  : 'floorplan_rightaccess',
                                },
                                {
                                    xtype      : 'filefield',
                                    fieldLabel : 'Right Access',
                                    labelWidth : '10%',
                                    padding    : '0 0 5px 0',
                                    itemId     : 'fd_file_right',
                                    name       : 'file_floorplan_rightaccess',
                                    emptyText  : 'Select File',
                                    buttonOnly : true,
                                    listeners  : {
                                        afterrender : function(cmp){
                                            cmp.fileInputEl.set({
                                                accept : 'image/*'
                                            });
                                        }
                                    }
                                },
                                {
                                    xtype     : 'image',
                                    width     : 320,
                                    style     : "border: 1px solid rgb(181 184 200)",
                                    bodyStyle : 'background:none',
                                    itemId    : 'file_image_right',
                                    name      : 'file_image_right',
                                    maxHeight : 350,
                                    height    : 'auto'

                                }
                            ]
                        },
                    ]
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});