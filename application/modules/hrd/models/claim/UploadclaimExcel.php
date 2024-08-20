<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ShiftTypeExcel
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Claim_UploadclaimExcel {
    private $status;
    private $msg;
    private $minCol;
    private $minRow;
    
    public function __construct() {
       $this->status = FALSE;
       $this->msg = "Process...";
       $this->minCol = 3;
       $this->minRow = 2;
    }
    
    /*@return Decan if success, return false if fail*/
    public function process_upload($fileName="file.xlsx",Box_Models_App_Session $ses,$data) {
        
        $file = $fileName;

        $excel = PHPExcel_IOFactory::load(realpath(APPLICATION_PATH . '/../public/app/hrd/uploads/claim/'.$file));
        $excel->setActiveSheetIndex(0);
        
        $sheet = $excel->getSheet(0);
        $highestRow = $sheet->getHighestRow();
        $highestColumn = $sheet->getHighestColumn();

        $header_rowData = array();
        $rowData = array();
        
        for ($row = $this->minRow; $row <= $highestRow; $row++) {

            $header_rowData = $sheet->rangeToArray('A1:' . $highestColumn . '1', NULL, TRUE, FALSE);
            $rowData[] = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, NULL, TRUE, FALSE);
            
        }

        $dao = new Hrd_Models_Claim_ClaimDao();
        $data_excel = array();
        
        $data['project_id'] = $ses->getProjectId();
        $data['pt_id'] = $ses->getPtId();

        $last_data = $rowData;
        end($last_data);
        $key_last_data = key($last_data);

        $message = '';
        $message_add = '';
        
        foreach ($rowData as $key => $item) {

            if($item[0][1]){

                //FORMAT LAMA
                if($header_rowData[0][0] == 'NO.' 
                    && $header_rowData[0][1] == 'No. Claim' 
                    && $header_rowData[0][2] == 'No. Polis'
                    && $header_rowData[0][3] == 'Kode BU' 
                    && $header_rowData[0][4] == 'Nama Badan Usaha' 
                    //&& $header_rowData[0][5] == 'Sub Grup '
                    && $header_rowData[0][6] == 'No. Kartu' 
                    && $header_rowData[0][7] == 'MEMBER NAME' 
                    && $header_rowData[0][8] == 'EMPLOYEE NAME'
                    && $header_rowData[0][9] == 'NIK' 
                    && $header_rowData[0][10] == 'REGISTERDATE' 
                    && $header_rowData[0][11] == 'INDATE'
                    && $header_rowData[0][12] == 'OUTDATE' 
                    && $header_rowData[0][13] == 'PLAN ID' 
                    && $header_rowData[0][14] == 'BENEFIT NAME'
                    && $header_rowData[0][15] == 'DESCRIPTION 1' 
                    && $header_rowData[0][16] == 'NAMA PROVIDER' 
                    && $header_rowData[0][17] == 'JENIS LAYANAN'
                    && $header_rowData[0][18] == 'BIAYA AJUAN' 
                    && $header_rowData[0][19] == 'BIAYA YANG DIBAYARKAN' 
                    //&& $header_rowData[0][20] == 'Total Subgrup '
                    && $header_rowData[0][21] == 'Member ID' 
                    && $header_rowData[0][22] == 'NIK Group'){
                
                    if($item[0][10]){
                        $register_date = date('Y-m-d', PHPExcel_Shared_Date::ExcelToPHP($item[0][10]));
                    }else{
                        $register_date = '';
                    }

                    if($item[0][11]){
                        $in_date = date('Y-m-d', PHPExcel_Shared_Date::ExcelToPHP($item[0][11]));
                    }else{
                        $in_date = '';
                    }

                    //OUTDATE = PAYMENTDATE
                    //tp diformat ini PAYMENTDATE belum ada, jadinya masih pakai OUTDATE, perlu diganti nnti
                    if($item[0][12]){
                        $out_date = date('Y-m-d', PHPExcel_Shared_Date::ExcelToPHP($item[0][12]));
                    }else{
                        $out_date = '';
                    }
                    
                    $data_excel = array(
                                        'no_claim'                      => $item[0][1],
                                        'no_polis'                      => $item[0][2],
                                        'kode_bu'                       => $item[0][3],
                                        'nama_badan_usaha'              => $item[0][4],
                                        'sub_grup'                      => $item[0][5],
                                        'no_kartu'                      => $item[0][6],
                                        // 'member_id'                     => $item[0][7],
                                        'member_name'                   => $item[0][7],
                                        'employee_name'                 => $item[0][8],
                                        // 'nik_group'                     => $item[0][10],
                                        'nik'                           => $item[0][9],
                                        'register_date'                 => $register_date,
                                        'in_date'                       => $in_date,
                                        'out_date'                      => $out_date,
                                        'plan_id'                       => $item[0][13],
                                        'benefit_name'                  => $item[0][14],
                                        'description'                   => $item[0][15],
                                        'nama_provider'                 => $item[0][16],
                                        'jenis_layanan'                 => $item[0][17],
                                        'biaya_ajuan'                   => $item[0][18],
                                        'biaya_dibayarkan'              => $item[0][19],
                                        'total_subgroup'                => $item[0][20],
                                        'member_id'                     => $item[0][21],
                                        'nik_group'                     => $item[0][22],

                    );


                    $check_db = $dao->getClaimCheck($ses,$data_excel,$data);
                    
                    if($check_db[0]){
                        $data['action'] = 'update';
                        $data['klaimpengobatan_id'] = $check_db[0][0]['klaimpengobatan_id'];
                        $data['amount_pengganti'] = $check_db[0][0]['amount_pengganti'];
                        $data['total_klaim'] = $check_db[0][0]['total_klaim'];
                        $data['saldo'] = $check_db[0][0]['saldo']; 
                        $data['plafon'] = $check_db[0][0]['plafon'];
                    }else{
                        $data['action'] = 'insert';
                        $data['klaimpengobatan_id'] = '';
                        $data['amount_pengganti'] = '';
                        $data['total_klaim'] = '';
                        $data['saldo'] = '';
                        $data['plafon'] = '';
                    }
                    
                    $input_db_master = $dao->uploadClaim($ses,$data_excel,$data);

                    if($input_db_master == 'not_found'){
                        if(empty($message)){
                            $message .= 'Data Employee tidak ditemukan, Silahkan cek kembali untuk No Claim: ';
                            $message .= $data_excel['no_claim'];
                        }else{
                            $message .= ', ' . $data_excel['no_claim'];
                        }
                    }  

                    if($input_db_master == 'not_found_plafon'){
                        if(empty($message_add)){
                            $message_add .= 'Data <b>plafon karyawan tidak ditemukan</b>, Silahkan cek kembali untuk No Claim: ';
                            $message_add .= $data_excel['no_claim'];
                        }else{
                            $message_add .= ', ' . $data_excel['no_claim'];
                        }
                    }

                }elseif($header_rowData[0][0] == 'CLAIM NO' 
                    && $header_rowData[0][1] == 'BATCH NO' 
                    && $header_rowData[0][2] == 'REGISTERDATE'
                    && $header_rowData[0][3] == 'PAYMENT DATE' 
                    && $header_rowData[0][4] == 'STATUS' 
                    && $header_rowData[0][5] == 'INDATE'
                    && $header_rowData[0][6] == 'OUTDATE' 
                    && $header_rowData[0][7] == 'MEMBER NO' 
                    && $header_rowData[0][8] == 'MEMBER NAME'
                    && $header_rowData[0][9] == 'nama subgrup' 
                    && $header_rowData[0][10] == 'NIK' 
                    && $header_rowData[0][11] == 'RELATIONSHIP STATUS'
                    && $header_rowData[0][12] == 'EMPLOYEE NAME' 
                    && $header_rowData[0][13] == 'SEX' 
                    && $header_rowData[0][14] == 'BIRTH DATE'
                    && $header_rowData[0][15] == 'PLAN ID' 
                    && $header_rowData[0][16] == 'IS ASO' 
                    && $header_rowData[0][17] == 'BENEFIT NAME'
                    && $header_rowData[0][18] == 'FACILITY' 
                    && $header_rowData[0][19] == 'PLACE OF SERVICE' 
                    && $header_rowData[0][20] == 'ICD10 1'
                    && $header_rowData[0][21] == 'AMOUNTREGISTER' 
                    && $header_rowData[0][22] == 'CLAIM'
                    && $header_rowData[0][23] == 'PAID' 
                    && $header_rowData[0][24] == 'TOTAL EXCESS'
                    && $header_rowData[0][25] == 'EXCESS MEMBER' 
                    && $header_rowData[0][26] == 'PAIDTOMEMBER' 
                    && $header_rowData[0][27] == 'REMARK HEADER'
                    && $header_rowData[0][28] == 'BANKHOLDER' 
                    && $header_rowData[0][29] == 'ACCOUNTNO' 
                    && $header_rowData[0][30] == 'BANKNAME'
                    && $header_rowData[0][31] == 'BANKCODE'
                    && $header_rowData[0][32] == 'Member ID'
                    && $header_rowData[0][33] == 'NIK Group'){

                    if($item[0][2]){
                        $register_date = date('Y-m-d', PHPExcel_Shared_Date::ExcelToPHP($item[0][2]));
                    }else{
                        $register_date = '';
                    }

                    if($item[0][5]){
                        $in_date = date('Y-m-d', PHPExcel_Shared_Date::ExcelToPHP($item[0][5]));
                    }else{
                        $in_date = '';
                    }

                    //OUTDATE = PAYMENTDATE
                    if($item[0][3]){
                        $out_date = date('Y-m-d', PHPExcel_Shared_Date::ExcelToPHP($item[0][3]));
                    }else{
                        $out_date = '';
                    }
                    
                    $data_excel = array(
                                        'no_claim'                      => $item[0][0],
                                        'no_polis'                      => '',
                                        'kode_bu'                       => '',
                                        'nama_badan_usaha'              => '',
                                        'sub_grup'                      => '',
                                        'no_kartu'                      => '',
                                        'member_name'                   => $item[0][8],
                                        'employee_name'                 => $item[0][12],
                                        'nik'                           => $item[0][10],
                                        'register_date'                 => $register_date,
                                        'in_date'                       => $in_date,
                                        'out_date'                      => $out_date,
                                        'plan_id'                       => '',
                                        'benefit_name'                  => '',
                                        'description'                   => '',
                                        'nama_provider'                 => $item[0][19],
                                        'jenis_layanan'                 => '',
                                        'biaya_ajuan'                   => $item[0][22],
                                        'biaya_dibayarkan'              => $item[0][26],
                                        'total_subgroup'                => '',
                                        'member_id'                     => $item[0][32],
                                        'nik_group'                     => $item[0][33],

                    );


                    $check_db = $dao->getClaimCheck($ses,$data_excel,$data);
                    
                    if($check_db[0]){
                        $data['action'] = 'update';
                        $data['klaimpengobatan_id'] = $check_db[0][0]['klaimpengobatan_id'];
                        $data['amount_pengganti'] = $check_db[0][0]['amount_pengganti'];
                        $data['total_klaim'] = $check_db[0][0]['total_klaim'];
                        $data['saldo'] = $check_db[0][0]['saldo']; 
                        $data['plafon'] = $check_db[0][0]['plafon'];
                    }else{
                        $data['action'] = 'insert';
                        $data['klaimpengobatan_id'] = '';
                        $data['amount_pengganti'] = '';
                        $data['total_klaim'] = '';
                        $data['saldo'] = '';
                        $data['plafon'] = '';
                    }
                    
                    $input_db_master = $dao->uploadClaim($ses,$data_excel,$data);

                    if($input_db_master == 'not_found'){
                        if(empty($message)){
                            $message .= 'Data <b>karyawan tidak ditemukan</b>, Silahkan cek kembali untuk No Claim: ';
                            $message .= $data_excel['no_claim'];
                        }else{
                            $message .= ', ' . $data_excel['no_claim'];
                        }
                    } 

                    if($input_db_master == 'not_found_plafon'){
                        if(empty($message_add)){
                            $message_add .= 'Data <b>plafon karyawan tidak ditemukan</b>, Silahkan cek kembali untuk No Claim: ';
                            $message_add .= $data_excel['no_claim'];
                        }else{
                            $message_add .= ', ' . $data_excel['no_claim'];
                        }
                    } 
                }else{
                    $message = 'Template tidak sesuai, Silahkan cek kembali/Download Template yang sudah disediakan.';
                }       
            }
        }

        if($message && $message_add){
            $message .= '<br><br>'.$message_add;
        }

        if(empty($message) && $message_add){
            $message .= $message_add;
        }

        if($message){
            $this->status = 0;
            $this->msg = $message;
        }else{
            $this->status = 1;
            $this->msg = 'success';
        }
        
        return array('status' => $this->status, 'msg' => $this->msg);
    }


    

    public function getStatus(){
        return $this->status;
    }
    
    public function getMsg(){
        return $this->msg;
    }

}
