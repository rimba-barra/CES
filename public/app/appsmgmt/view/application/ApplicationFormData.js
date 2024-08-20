//Ext.define('Appsmgmt.view.application.ApplicationFormData',{extend:'Ext.form.Panel',alias:'widget.ApplicationFormData',itemId:'Application',frame:true,autoScroll:true,bodyBorder:true,bodyPadding:10,bodyStyle:'border-top:none;border-left:none;border-right:none;',initComponent:function(){var me=this;Ext.applyIf(me,{items:[{xtype:'hiddenfield',itemId:'apps_id',name:'apps_id',hidden:true},{xtype:'fieldcontainer',layout:'column',defaults:{labelSeparator:' ',labelClsExtra:'small'},items:[{xtype:'textfield',fieldLabel:'App. Name',itemId:'apps_name',name:'apps_name',anchor:'70%',columnWidth:0.7,allowBlank:false,enforceMaxLength:true,maxLength:50,maskRe:/[A-Za-z0-9\s]/},{xtype:'checkboxfield',itemId:'projectpt',name:'projectpt',boxLabel:'Project-PT',boxLabelCls:'x-form-cb-label small',inputValue:'1',uncheckedValue:'0',margin:'0 0 0 30',anchor:'30%',columnWidth:0.3}]},{xtype:'fieldcontainer',layout:'column',defaults:{labelSeparator:' ',labelClsExtra:'small'},items:[{xtype:'textfield',fieldLabel:'Base Name',itemId:'apps_basename',name:'apps_basename',anchor:'70%',columnWidth:0.7,allowBlank:false,enforceMaxLength:true,maxLength:50,maskRe:/[A-Za-z0-9]/},{xtype:'checkboxfield',itemId:'projectpt_menu',name:'projectpt_menu',boxLabel:'Show Project-PT Menu',boxLabelCls:'x-form-cb-label small',inputValue:'1',uncheckedValue:'0',margin:'0 0 0 30',anchor:'30%',columnWidth:0.3,disabled:true,value:0}]},{xtype:'fieldcontainer',layout:'column',defaults:{labelSeparator:' ',labelClsExtra:'small'},items:[{xtype:'textarea',fieldLabel:'Description',itemId:'description',name:'description',anchor:'70%',height:50,labelSeparator:' ',labelClsExtra:'small',enforceMaxLength:true,maxLength:255,maskRe:/[^\`\"\']/,columnWidth:0.7},{xtype:'checkboxfield',boxLabel:'Active',itemId:'active',name:'active',inputValue:'1',uncheckedValue:'0',boxLabelCls:'x-form-cb-label small',margin:'30 0 0 30',anchor:'30%',columnWidth:0.3}]}],dockedItems:[{xtype:'toolbar',dock:'bottom',ui:'footer',layout:{padding:6,type:'hbox'},items:[{xtype:'button',action:'save',itemId:'btnSave',padding:5,width:75,iconCls:'icon-save',text:'Save'},{xtype:'button',action:'cancel',itemId:'btnCancel',padding:5,width:75,iconCls:'icon-cancel',text:'Cancel'}]}]});me.callParent(arguments)}});

Ext.define('Appsmgmt.view.application.ApplicationFormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ApplicationFormData',
    itemId: 'Application',
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [{
                xtype: 'hiddenfield',
                itemId: 'apps_id',
                name: 'apps_id',
                hidden: true
            }, {
                xtype: 'fieldcontainer',
                layout: 'column',
                defaults: {
                    labelSeparator: ' ',
                    labelClsExtra: 'small'
                },
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'App. Name',
                    itemId: 'apps_name',
                    name: 'apps_name',
                    anchor: '70%',
                    columnWidth: 0.7,
                    allowBlank: false,
                    enforceMaxLength: true,
                    maxLength: 50,
                    maskRe: /[A-Za-z0-9\s]/
                }, {
                    xtype: 'checkboxfield',
                    itemId: 'projectpt',
                    name: 'projectpt',
                    boxLabel: 'Project-PT',
                    boxLabelCls: 'x-form-cb-label small',
                    inputValue: '1',
                    uncheckedValue: '0',
                    margin: '0 0 0 30',
                    anchor: '30%',
                    columnWidth: 0.3
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: 'column',
                defaults: {
                    labelSeparator: ' ',
                    labelClsExtra: 'small'
                },
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Base Name',
                    itemId: 'apps_basename',
                    name: 'apps_basename',
                    anchor: '70%',
                    columnWidth: 0.7,
                    allowBlank: false,
                    enforceMaxLength: true,
                    maxLength: 50,
                    maskRe: /[A-Za-z0-9]/
                }, {
                    xtype: 'checkboxfield',
                    itemId: 'projectpt_menu',
                    name: 'projectpt_menu',
                    boxLabel: 'Show Project-PT Menu',
                    boxLabelCls: 'x-form-cb-label small',
                    inputValue: '1',
                    uncheckedValue: '0',
                    margin: '0 0 0 30',
                    anchor: '30%',
                    columnWidth: 0.3,
                    disabled: true,
                    value: 0
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: 'column',
                defaults: {
                    labelSeparator: ' ',
                    labelClsExtra: 'small'
                },
                items: [{
                    xtype: 'textarea',
                    fieldLabel: 'Description',
                    itemId: 'description',
                    name: 'description',
                    anchor: '70%',
                    height: 50,
                    labelSeparator: ' ',
                    labelClsExtra: 'small',
                    enforceMaxLength: true,
                    maxLength: 255,
                    maskRe: /[^\`\"\']/,
                    columnWidth: 0.7
                }, {
                    xtype: 'checkboxfield',
                    boxLabel: 'Active',
                    itemId: 'active',
                    name: 'active',
                    inputValue: '1',
                    uncheckedValue: '0',
                    boxLabelCls: 'x-form-cb-label small',
                    margin: '30 0 0 30',
                    anchor: '30%',
                    columnWidth: 0.3
                }]
            },{
                xtype: 'fieldcontainer',
                layout: 'column',
                defaults: {
                    labelSeparator: ' ',
                    labelClsExtra: 'small'
                },
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'URL Address',
                    itemId: 'url_address',
                    name: 'url_address',
                    anchor: '70%',
                    columnWidth: 0.7,
                    //allowBlank: false,
                    enforceMaxLength: true,
                    //maxLength: 50,
                    //maskRe: /[A-Za-z0-9\s]/
                }]
            }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [{
                    xtype: 'button',
                    action: 'save',
                    itemId: 'btnSave',
                    padding: 5,
                    width: 75,
                    iconCls: 'icon-save',
                    text: 'Save'
                }, {
                    xtype: 'button',
                    action: 'cancel',
                    itemId: 'btnCancel',
                    padding: 5,
                    width: 75,
                    iconCls: 'icon-cancel',
                    text: 'Cancel'
                }]
            }]
        });
        me.callParent(arguments)
    }
});