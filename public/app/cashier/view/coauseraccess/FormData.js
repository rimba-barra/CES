Ext.define('Cashier.view.coauseraccess.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.coauseraccessformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 270,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
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
                    value: 'copycoa'
                },
             /*   {
                    xtype: 'hiddenfield',
                    name: 'coauseraccess_id',
                } ,*/
                {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Project',
                           // layout: 'hbox',
                            items: [                               
                                    {
                                        xtype: 'projectcombobox',
                                        fieldLabel:'',
                                        emptyText: 'Select Project',
                                        name: 'project_id',
                                        allowBlank: false,
                                        enableKeyEvents: true,
                                        tpl: Ext.create('Ext.XTemplate',
                                          '<table class="x-grid-table" width="250px" >',
                                            '<tr class="x-grid-row">',
                                              
                                                '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                                            '</tr>',
                                            '<tpl for=".">',
                                                '<tr class="x-boundlist-item">',
                                                    '<td><div class="x-grid-cell x-grid-cell-inner">{projectname}</div></td>',
                                                '</tr>',
                                            '</tpl>',
                                         '</table>'
                                     ),    
                                    },

                            ]
                        },              
                {
                    xtype: 'ptprojectcombobox',
                    fieldLabel:'PT',
                    emptyText: 'Select PT',
                    name: 'pt_id',
                    allowBlank: false,
                    enableKeyEvents: true
                },
                  {
                            xtype: 'fieldcontainer',
                            fieldLabel: '',
                            layout: 'hbox',
                            items: [                               
                                    {
                                        xtype: 'usermodulecashiercombobox',
                                        fieldLabel: 'User Name',
                                        itemId: 'fd_user_id_source' + me.uniquename,
                                        id: 'user_id_source' + me.uniquename,
                                        name: 'user_id_source',
                                        width: 300,
                                        emptyText: 'Select user name',
                                        readOnly: false,
                                        allowBlank: false,
                                        enforceMaxLength: true,
                                        enableKeyEvents: true,
                                        rowdata: null,
                                         tpl: Ext.create('Ext.XTemplate',
                                          '<table class="x-grid-table" width="500px" >',
                                            '<tr class="x-grid-row">',
                                                '<th width="50px" style="display:none"><div class="x-column-header x-column-header-inner" >User id</div></th>',
                                                '<th width="50px"><div class="x-column-header x-column-header-inner">Username</div></th>',
                                                '<th width="50px"><div class="x-column-header x-column-header-inner">User Fullname</div></th>',
                                            '</tr>',
                                            '<tpl for=".">',
                                                '<tr class="x-boundlist-item">',
                                                    '<td style="display:none"><div class="x-grid-cell x-grid-cell-inner" >{user_id}</div></td>',
                                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{user_name}</div></td>',
                                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{user_fullname}</div></td>',
                                                '</tr>',
                                            '</tpl>',
                                         '</table>'
                                     ), 
                                    },
                            ]
                        }, 
                         {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Project Destination',
                          //  layout: 'hbox',
                            items: [                               
                                    {
                                        xtype: 'projectcomboboxV2',
                                        fieldLabel:'',
                                        emptyText: 'Select Project',
                                        name: 'project_id_destination',
                                        allowBlank: false,
                                        enableKeyEvents: true,
                                        tpl: Ext.create('Ext.XTemplate',
                                          '<table class="x-grid-table" width="250px" >',
                                            '<tr class="x-grid-row">',
                                              
                                                '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                                            '</tr>',
                                            '<tpl for=".">',
                                                '<tr class="x-boundlist-item">',
                                                    '<td><div class="x-grid-cell x-grid-cell-inner">{projectname}</div></td>',
                                                '</tr>',
                                            '</tpl>',
                                         '</table>'
                                     ),    
                                    },

                            ]
                        },              
                          {
                    xtype: 'ptprojectcomboboxV2',
                    fieldLabel:'Copy To PT',
                    emptyText: 'Select PT',
                    name: 'pt_id_destination',
                    allowBlank: false,
                    enableKeyEvents: true
                },
                 {
                            xtype: 'fieldcontainer',
                            fieldLabel: '',
                           layout: 'hbox',
                            items: [                               
                                    {
                                        xtype: 'usermodulecashiercomboboxV2',
                                        fieldLabel: 'Copy To User Name',
                                        itemId: 'fd_user_id_destination' + me.uniquename,
                                        id: 'fd_user_id_destination' + me.uniquename,
                                        name: 'user_id_destination',
                                        width: 300,
                                        emptyText: 'Select user name',
                                        readOnly: false,
                                        allowBlank: false,
                                        enforceMaxLength: true,
                                        enableKeyEvents: true,
                                        rowdata: null,
                                         tpl: Ext.create('Ext.XTemplate',
                                          '<table class="x-grid-table" width="500px" >',
                                            '<tr class="x-grid-row">',
                                                '<th width="50px" style="display:none"><div class="x-column-header x-column-header-inner" >User id</div></th>',
                                                '<th width="50px"><div class="x-column-header x-column-header-inner">Username</div></th>',
                                                '<th width="50px"><div class="x-column-header x-column-header-inner">User Fullname</div></th>',
                                            '</tr>',
                                            '<tpl for=".">',
                                                '<tr class="x-boundlist-item">',
                                                    '<td style="display:none"><div class="x-grid-cell x-grid-cell-inner" >{user_id}</div></td>',
                                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{user_name}</div></td>',
                                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{user_fullname}</div></td>',
                                                '</tr>',
                                            '</tpl>',
                                         '</table>'
                                     ), 
                                    },
                            ]
                        }, 




              
              
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
     generateDockedItem: function () {
        var me = this;
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                padding: '0 0 0 0',
                layout: {
                    padding: 6,
                    type: 'hbox',
                },
                items: [
                    {
                        xtype: 'fieldcontainer',
                        layout: 'vbox',
                        align: 'right',
                        bodyBorder: false,
                        defaults: {
                            layout: 'fit'
                        },
                        items: [
                            {xtype: 'tbspacer', height: 5},
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
                                        xtype: 'button',
                                        action: 'savenew',
                                        itemId: 'btnSave',
                                        padding: 5,
                                        width: 110,
                                        iconCls: 'icon-save',
                                        text: 'Save & New'
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'save',
                                        itemId: 'btnSaveDraft',
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
                                        handler: function () {
                                            this.up('window').close();
                                        }
                                    },
                                ]
                            },
                        ]
                    },
                ]
            }
        ];
        return x;
    }
});

