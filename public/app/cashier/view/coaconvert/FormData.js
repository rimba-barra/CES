Ext.define('Cashier.view.coaconvert.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.coaconvertformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 240,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    id: 'coaconvertid',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'coaconvert_id',
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_pt_id',
                    name: 'pt_id',
                    fieldLabel: 'pt_id',
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 20,
                },  
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_project_id',
                    name: 'project_id',
                    fieldLabel: 'project_id',
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 20,
                }, 
                {
                    xtype: 'textfield',
                    itemId: 'fdms_projectname',
                    name: 'projectname',
                    fieldLabel: 'Project',
                    allowBlank: false,
                    readOnly: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 100,
                },  
                {
                    xtype: 'textfield',
                    itemId: 'fdms_pt_name',
                    name: 'ptname',
                    fieldLabel: 'PT',
                    allowBlank: false,
                    readOnly: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 100,
                },  
                {
                    xtype: 'coadeptvouchercombobox',
                    fieldLabel: 'COA OLD',
                    itemId: 'fdms_coa_old',
                    id: 'coa_id',
                    name: 'coa_old',
                    valueField: 'coa',
                    displayField: 'coaname',    
                    emptyText: 'Pilih COA Lama',
                    width: 230,
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    //forceSelection:true,
                    typeAhead:false,
                    listeners:{
                                
                                keyup: function(field){
                                    var c = 0;
                                       var searchString = field.getValue();

                                       if (searchString) {

                                       this.store.filterBy(function (record, id) {
                                        if( record.get('coaname').toLowerCase().indexOf(field.getValue()) > -1) { 
                                            return true;
                                            this.store.clearFilter(true);
                                        }
                                        else if (record.get('coa').toLowerCase().indexOf(field.getValue()) > -1) {
                                            return true;
                                            this.store.clearFilter(true);
                                        }
                                        else if (record.get('kelsubdesc').toLowerCase().indexOf(field.getValue()) > -1) {
                                            return true;
                                            this.store.clearFilter(true);
                                        }
                                        else {
                                            return false;
                                            this.store.clearFilter(true);
                                        }
                                        });
                                       }

                                },
                                buffer:300,
                            },
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'MODE',
                    defaultType: 'radiofield',
                    defaults: {
                        flex: 1
                    },
                    layout: 'hbox',
                    items: [
                        {
                            boxLabel: 'MOVE',
                            name: 'mode',
                            inputValue: 'move',
                            id: 'radio1_mode',
                            allowBlank: false,
                            checked: true,
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            boxLabel: 'RENAME',
                            name: 'mode',
                            inputValue: 'rename',
                            id: 'radio2_mode',
                            allowBlank: false,
                            checked: false,
                        }
                    ]
                },
                {
                    xtype: 'coadeptvouchercombobox',
                    fieldLabel: 'COA NEW',
                    itemId: 'fdms_coa_new',
                    id: 'fdms_coa_new',
                    name: 'coa_new',
                    valueField: 'coa',
                    displayField: 'coaname',    
                    emptyText: 'Pilih COA Baru',
                    width: 230,
                    // allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    //forceSelection:true,
                    typeAhead:false,
                    listeners:{
                                
                                keyup: function(field){
                                    var c = 0;
                                       var searchString = field.getValue();

                                       if (searchString) {

                                       this.store.filterBy(function (record, id) {
                                        if( record.get('coaname').toLowerCase().indexOf(field.getValue()) > -1) { 
                                            return true;
                                            this.store.clearFilter(true);
                                        }
                                        else if (record.get('coa').toLowerCase().indexOf(field.getValue()) > -1) {
                                            return true;
                                            this.store.clearFilter(true);
                                        }
                                        else if (record.get('kelsubdesc').toLowerCase().indexOf(field.getValue()) > -1) {
                                            return true;
                                            this.store.clearFilter(true);
                                        }
                                        else {
                                            return false;
                                            this.store.clearFilter(true);
                                        }
                                        });
                                       }

                                },
                                buffer:300,
                            },
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_coa_new2',
                    id: 'fdms_coa_new2',
                    name: 'coa_new2',
                    emptyText: 'Ketik COA Baru',
                    fieldLabel: 'COA NEW',
                    // allowBlank: false,
                    enforceMaxLength: true,
                    maxLength: 9,
                    absoluteReadOnly: true,
                    anchor: '-5',
                    enableKeyEvents: true,

                },              
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
                padding: 5,
                width: 75,
                iconCls: 'icon-save',
                text: 'Save'
            },
            {
                xtype: 'button',
                action: 'force',
                itemId: 'btnForce',
                padding: 5,
                width: 100,
                iconCls: 'icon-approve',
                text: 'Force Convert'
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

