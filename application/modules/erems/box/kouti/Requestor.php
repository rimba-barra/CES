<?php

/**
 * Description of Requestor
 *
 * @author MIS
 */
class Erems_Box_Kouti_Requestor {
    
    /*
     mode_read:new
month_pick:6
year_pick:2014
     */
    
    public function debugFunct(){
        $x = array(
            "read"=>array(
                "unit"=>array('mode_read'=>'attachfingerprint','purchaseletter_id'=>'23007','payment_id'=>'21016','spk_id'=>'2009','unit_id'=>'1004')
            ),
            "create"=>array(
                "object"=>'{"mode_create":"updatereschedule","data":{"reschedule_id":"8","harga_total_jual":"71543186.5","rencanaserahterima_date":"2015-06-26 00:00:00.000","rencanaserahterima_month":"","reason":"","balance_value":"0","purchaseletter_purchaseletter_id":"28012","detail":[{"schedule_id":20,"scheduletype_id":"","purchaseletter_id":28012,"description":"","termin":1,"duedate":"2015-07-22T00:00:00","amount":"250000.0000","remaining_balance":"250000.0000","sourcemoney_sourcemoney_id":3,"denda":"","scheduletype_scheduletype_id":4,"scheduletype_scheduletype":"TJ","scheduletype_description":"Tanda Jadi","sourcemoney_sourcemoney":"CUSTOMER","sourcemoney_description":""},{"schedule_id":22,"scheduletype_id":"","purchaseletter_id":28012,"description":"","termin":1,"duedate":"2015-09-22T00:00:00","amount":"35271593.2500","remaining_balance":"35271593.2500","sourcemoney_sourcemoney_id":3,"denda":"","scheduletype_scheduletype_id":5,"scheduletype_scheduletype":"UM","scheduletype_description":"Uang Muka","sourcemoney_sourcemoney":"CUSTOMER","sourcemoney_description":""},{"schedule_id":23,"scheduletype_id":"","purchaseletter_id":28012,"description":"","termin":"1","duedate":"2015-10-22T00:00:00","amount":"17885796.6300","remaining_balance":"17885796.6300","sourcemoney_sourcemoney_id":3,"denda":"","scheduletype_scheduletype_id":1,"scheduletype_scheduletype":"SIP","scheduletype_description":"CASH","sourcemoney_sourcemoney":"CUSTOMER","sourcemoney_description":""},{"schedule_id":"","scheduletype_id":"","purchaseletter_id":"","description":"","termin":"11","duedate":"2015-11-22T00:00:00","amount":"18135796.619999997","remaining_balance":"18135796.619999997","sourcemoney_sourcemoney_id":"","denda":"","scheduletype_scheduletype_id":"","scheduletype_scheduletype":"SIP","scheduletype_description":"","sourcemoney_sourcemoney":"CUSTOMER","sourcemoney_description":""}],"deletedRows":"21,24,"}}'
            ),
            "update"=>array(
                "customer"=>'{"overtimeheader_id":"1004","date":"2014-08-04T00:00:00","status":2,"reason":"asdasd asd","plan_before_start":"01:00:00","plan_before_end":"10:00:00","plan_after_start":"01:00:00","plan_after_end":"10:00:00","basic_value":"","work_hour":"","value":"","extra_meal":"","employee_ktp_number":"","employee_ktp_name":"","employee_ktp_address":"","employee_phone_number":"","employee_hp_number":"","employee_office_number":"","employee_employee_id":"4","employee_employee_nik":"","employee_employee_name":"Mark Hoppus","employee_employee_active":"","employee_sex":"","employee_birth_place":"","employee_birth_date":"","employee_nik_group":"","employee_address":"","employee_zipcode":"","employee_npwp":"","employee_email":"","employee_passport_number":"","employee_child_count":"","employee_hire_date":"","employee_assignation_date":"","employee_contractend_date":"","employee_nonactive_date":"","employee_temp":"","overtimes":[{"start_time":"2000-02-01T10:00:00","end_time":"2000-02-01T20:00:00","taken_time":"BEFORE"},{"start_time":"2000-02-01T00:00:00","end_time":"2000-02-01T00:00:00","taken_time":"AFTER"}],"id":null}'
            )
            
        );
        return $x;
    }
    
}

?>
