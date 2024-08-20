Ext.define('Erems.view.townplanninglegal.FormData', {
    extend        : 'Erems.library.template.view.FormData',
    alias         : 'widget.townplanninglegalformdata',
    requires      : ['Erems.template.ComboBoxFields'],
    frame         : true,
    autoScroll    : true,
    bodyBorder    : true,
    height        : 250,
    bodyStyle     : 'border-top:none;border-left:none;border-right:none;',
    editedRow     : -1,
    initComponent : function() {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            fieldDefaults : {
                msgTarget      : 'side',
                labelSeparator : ''
            },
            items : [
                {
                    padding   : '10px 0 0 0',
                    layout    : 'hbox',
                    bodyStyle : 'border:0px;background-color:#dfe8f5;',
                    name      : 'tanahcode',
                    items     : [
                        {
                            xtype          : 'checkboxfield',
                            fieldLabel     : 'Set to Cluster',
                            name           : 'is_cluster',
                            boxLabel       : '(set ke semua unit yang statusnya planning)',
                            inputValue     : '1',
                            uncheckedValue : '0',
                            flex: 1
                        }
                    ]
                },
                {
                    padding   : '10px 0 0 0',
                    layout    : 'hbox',
                    bodyStyle : 'border:0px;background-color:#dfe8f5;',
                    name      : 'tanahcode',
                    items     : [
                        {
                            xtype        : 'combobox',
                            queryMode    :'local',
                            displayField : cbf.tanahcode.d,
                            valueField   : cbf.tanahcode.v,
                            fieldLabel   : 'PT TANAH 1',
                            name         : 'tanahcode_pt_id',
                            allowBlank   : false,
                            flex         : 3,
                            listeners    :{
                                beforequery : function(record){
                                    record.query = new RegExp(record.query, 'i');
                                    record.forceAll = true;
                                }
                            }
                        },
                    ]
                },
                {
                    padding   : '10px 0 0 0',
                    layout    : 'hbox',
                    bodyStyle : 'border:0px;background-color:#dfe8f5;',
                    name      : 'tanahcode2',
                    items     : [
                        {
                            xtype        : 'combobox',
                            queryMode    : 'local',
                            displayField : cbf.tanahcode.d,
                            valueField   : cbf.tanahcode.v,
                            fieldLabel   : 'PT TANAH 2',
                            name         : 'tanahcode2_pt_id',
                            flex         : 3,
                            listeners    :{
                                beforequery : function(record){
                                    record.query = new RegExp(record.query, 'i');
                                    record.forceAll = true;
                                }
                            }
                        },
                    ]
                },
                {
                    padding   : '10px 0 0 0',
                    layout    : 'hbox',
                    bodyStyle : 'border:0px;background-color:#dfe8f5;',
                    name      :'pt_id_body',
                    items     : [
                        {
                            xtype        : 'combobox',
                            queryMode    :'local',
                            displayField : cbf.pt.d,
                            valueField   : cbf.pt.v,
                            allowBlank   : false,
                            fieldLabel   : 'PT',
                            name         : 'pt_pt_id',
                            flex         : 3,
                            listeners    :{
                                beforequery: function(record){
                                    record.query = new RegExp(record.query, 'i');
                                    record.forceAll = true;
                                }
                            },
                            readOnly : true,
                        }, 
                    ]
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