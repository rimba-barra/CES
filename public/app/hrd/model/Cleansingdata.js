Ext.define('Hrd.model.Cleansingdata', {
    extend: 'Ext.data.Model',
    alias: 'model.cleansingdatanmodel',
    idProperty: 'cleansingdata_id',
    fields: [
        {name: 'cleansingdata_id', type: 'int'},
        {name: 'changetype_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'projectname', type: 'string'},
        {name: 'new_projectname', type: 'string'},
        {name: 'pt_id', type: 'int'},
        {name: 'ptname', type: 'string'},
        {name: 'new_ptname', type: 'string'},
        {name: 'department_id', type: 'int'},
        {name: 'department', type: 'string'},
        {name: 'new_department', type: 'string'},
        {name: 'employee_id', type: 'int'},
        {name: 'employee_name', type: 'string'},
        {name: 'employee_nik', type: 'string'},
        {name: 'contract_ke', type: 'int'},
        {name: 'employeestatus_id', type: 'int'},
        {name: 'reportto_position_id', type: 'int'},
        {name: 'reporttoname', type: 'string'},
        {name: 'employeestatus', type: 'string'},
        {name: 'is_approve', type: 'boolean'},
        {name: 'sk_number', type: 'string'},
        {name: 'assignationdate', type: 'date'},
        {name: 'mulaikontrak', type: 'date'},
        {name: 'berakhirkontrak', type: 'date'},
        //{name: 'effective_date', type: 'date'},
        {name: 'old_group_id', type: 'int'},
        {name: 'new_group_id', type: 'int'},
        {name: 'group', type: 'string'},
        {name: 'old_position_id', type: 'int'},
        {name: 'new_position_id', type: 'int'},
        {name: 'position', type: 'string'},
        {name: 'old_project_id', type: 'int'},
        {name: 'new_project_id', type: 'int'},
        {name: 'old_pt_id', type: 'int'},
        {name: 'new_pt_id', type: 'int'},
        {name: 'old_department_id', type: 'int'},
        {name: 'new_department_id', type: 'int'},
        {name: 'old_costcenter1', type: 'int'},
        {name: 'new_costcenter1', type: 'int'},
        {name: 'old_costcenter2', type: 'int'},
        {name: 'new_costcenter2', type: 'int'},
        {name: 'old_costcenter3', type: 'int'},
        {name: 'new_costcenter3', type: 'int'},
        {name: 'old_division_id', type: 'int'},
        {name: 'new_division_id', type: 'int'},
        {name: 'change_mode', type: 'int'},
        {name: 'new_atasan_id', type: 'int'},
        {name: 'new_atasan_nama', type: 'string'},
        {name: 'is_atasan_karyawan', type: 'boolean'},
        {name: 'old_jobfamily_id', type: 'int'},
        {name: 'new_jobfamily_id', type: 'int'},
        {name: 'jobfamily', type: 'string'},
        {name: 'new_jobfamily', type: 'string'},
        {name: 'old_banding_id', type: 'int'},
        {name: 'new_banding_id', type: 'int'},
        {name: 'banding', type: 'string'},
        {name: 'new_banding', type: 'string'},
        {name: 'old_reportto_id', type: 'int'},
        {name: 'new_reportto_id', type: 'int'},
        {name: 'old_reportto_position_id', type: 'int'},
        {name: 'new_reportto_position_id', type: 'int'},
        {name: 'reason', type: 'string'},
        {name: 'note', type: 'string'},
        {name: 'sk_file_upload_path', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'mode_read', type: 'string'},
        {name: 'hideparam', type: 'string'},
        {name: 'alokasibiaya1', type: 'string'},
        {name: 'alokasibiaya2', type: 'string'},
        {name: 'alokasibiaya3', type: 'string'},
        {name: 'section', type: 'string'},
        {name: 'alokasibiaya1', type: 'string'},
        {name: 'alokasibiaya2', type: 'string'},
        {name: 'alokasibiaya3', type: 'string'},
        {name: 'assignation_date', type: 'date'},
        {name: 'mulaikontrak', type: 'date'},
        {name: 'berakhirkontrak', type: 'date'},
        {name: 'hire_date', type: 'date'},
        {name: 'contract_ke', type: 'int'},
        {name: 'employeestatus', type: 'string'},
        {name: 'old_section_id', type: 'int'},
        {name: 'new_section_id', type: 'int'},        
        {name: 'sk_file_upload_path', type: 'string'},
        {name: 'status_sendemail', type: 'int'},
        {name: 'generalparameter_id', type: 'int'},
        {name: 'approve_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'approvalby', type: 'int'},
        {name: 'approve_user_id', type: 'int'},
        {name: 'approvalname', type: 'string'},
        {name: 'typetransfer', type: 'string'},
        {name: 'createby', type: 'string'},
        {name: 'updatedby', type: 'string'},
        {name: 'userapprove', type: 'string'},
	{name: 'groupcode', type: 'string'},
    ]
});