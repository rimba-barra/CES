<?php

class Hrd_Models_Disckaryawan extends Zend_Db_Table_Abstract
{
	protected $_schema		= 'hrd';
	protected $_name 		= 't_disc';	
	protected $datadelimiter	= '~#~';
	protected $returned 		= array('total'=>0, 'success'=>false, 'data'=>array());	
	protected $session;
	
	function init()
	{
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}
		
	function dataRead($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {   
				$data = array (
					$param['employee_name'], 
					$param['noref'], 
					$param['project_id'], 
					$param['pt_id'], 
					$param['lokasi_project_id'], 
					$param['discstatus'], 
					$param['tgl_pengajuan_dari'], 
					$param['tgl_pengajuan_sampai'], 
					$param['start'], 
					$param['limit'],
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_disc_read', $data);
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
                            //var_dump($e);                         
                        }
		}		
		return $return;
	}
        
	function discstatusRead($param=array())
	{
		$return['success'] = false;
		if (is_array($param) && count($param))
		{
			try {
				$data = array (
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_discstatus_read', $data);
				$return = $result[0];				
			} catch(Exception $e) { }
		}		
		return $return;
	}
		
	function dataExport($param=array()){
            require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel.php';
            require_once APPLICATION_PATH . '/modules/hrd/library/phpexcel/PHPExcel/IOFactory.php';
                              
            $this->destination = getcwd() . '/app/hrd/uploads/disckaryawan/exportdata/';
            $this->httpdirect = 'app/hrd/uploads/disckaryawan/exportdata/';
            if (!file_exists($this->destination)) {
                mkdir($this->destination, 0777, true);
            }
            
            $result = $this->dataRead($param);
            $data = $result['data'];
            
            $objPHPExcel = new PHPExcel();
            $objPHPExcel->getProperties()->setTitle("title")
                    ->setDescription("description");
            
            // number format, with thousands seperator and two decimal points.
            $numberFormat = '#,#0.##;[Red]-#,#0.##';

            // writer will create the first sheet for us, let's get it
            $objSheet = $objPHPExcel->getActiveSheet();
            // rename the sheet
            $objSheet->setTitle('export daftar diskon karyawan');
            // let's bold and size the header font and write the header
            // as you can see, we can specify a range of cells, like here: cells from A1 to A4
            $objSheet->getStyle('A1:AZ1')->getFont()->setBold(true)->setSize(12);

            // write header

            $objSheet->getCell('A1')->setValue('Project');
            $objSheet->getCell('B1')->setValue('PT');
            $objSheet->getCell('C1')->setValue('Lokasi Project Pembelian');
            $objSheet->getCell('D1')->setValue('Status Transaksi');
            $objSheet->getCell('E1')->setValue('No Referensi');
            $objSheet->getCell('F1')->setValue('Employee Name');
            $objSheet->getCell('G1')->setValue('Department');
            $objSheet->getCell('H1')->setValue('Position');
            $objSheet->getCell('I1')->setValue('Hire Date');
            $objSheet->getCell('J1')->setValue('Masa Kerja Tahun');
            $objSheet->getCell('K1')->setValue('Masa Kerja Bulan');
            $objSheet->getCell('L1')->setValue('Max Luas Tanah (m2)');
            $objSheet->getCell('M1')->setValue('Max Luas Bangunan (m2)');
            $objSheet->getCell('N1')->setValue('Max Disc (%)');
            $objSheet->getCell('O1')->setValue('Max Disc dari masa kerja (%)');
            $objSheet->getCell('P1')->setValue('Tgl Pengajuan');
            $objSheet->getCell('Q1')->setValue('Cluster / Tower');
            $objSheet->getCell('R1')->setValue('Blok / Lantai / Unit');
            $objSheet->getCell('S1')->setValue('Tipe');
            $objSheet->getCell('T1')->setValue('Jenis');
            $objSheet->getCell('U1')->setValue('Luas Tanah Total (m2)');
            $objSheet->getCell('V1')->setValue('Luas Tanah Diskon (m2)');
            $objSheet->getCell('W1')->setValue('Harga Tanah');
            $objSheet->getCell('X1')->setValue('Total Harga Tanah');
            $objSheet->getCell('Y1')->setValue('Luas Bangunan Total (m2)');
            $objSheet->getCell('Z1')->setValue('Luas Bangunan Diskon (m2)');
            $objSheet->getCell('AA1')->setValue('Harga Bangunan /m2');
            $objSheet->getCell('AB1')->setValue('Harga At Cost Bangunan /m2');
            $objSheet->getCell('AC1')->setValue('Total At Cost Bangunan');
            $objSheet->getCell('AD1')->setValue('Harga Price List');
            $objSheet->getCell('AE1')->setValue('Kondisi Kavling');
            $objSheet->getCell('AF1')->setValue('Diskon Sudut (Rp)');
            $objSheet->getCell('AG1')->setValue('Diskon Tusuk Sate (Rp)');
            $objSheet->getCell('AH1')->setValue('Total Diskon');
            $objSheet->getCell('AI1')->setValue('Persen Ditanggung Project (%)');
            $objSheet->getCell('AJ1')->setValue('Rp Ditanggung Project (Rp)');
            $objSheet->getCell('AK1')->setValue('Rp Ditanggung Project Employee (Rp)');
            $objSheet->getCell('AL1')->setValue('Harga Setelah Diskon');
            $objSheet->getCell('AM1')->setValue('HC Project');
            $objSheet->getCell('AN1')->setValue('Tgl Approve HC Project');
            $objSheet->getCell('AO1')->setValue('GM Project');
            $objSheet->getCell('AP1')->setValue('Tgl Approve GM Project');
            $objSheet->getCell('AQ1')->setValue('Director Project');
            $objSheet->getCell('AR1')->setValue('Tgl Approve Director Project');
            $objSheet->getCell('AS1')->setValue('HC Kantor Pusat Tahap 1');
            $objSheet->getCell('AT1')->setValue('Tgl Approve HC Kantor Pusat Tahap 1');
            $objSheet->getCell('AU1')->setValue('HC Kantor Pusat Tahap 2');
            $objSheet->getCell('AV1')->setValue('Tgl Approve HC Kantor Pusat Tahap 2');
            $objSheet->getCell('AW1')->setValue('Director Kantor Pusat');
            $objSheet->getCell('AX1')->setValue('Tgl Director Kantor Pusat');
            $objSheet->getCell('AY1')->setValue('Surat Rekomendasi ditujukan pada');
            
            $i = 1;
            foreach ($data as $row) {
                $i++;
                $objSheet->getCell('A' . $i)->setValue($row['employee_project_name']);
                $objSheet->getCell('B' . $i)->setValue($row['employee_pt_name']);
                $objSheet->getCell('C' . $i)->setValue($row['lokasi_project_name']);
                $objSheet->getCell('D' . $i)->setValue($row['status_name']);
                $objSheet->getCell('E' . $i)->setValue($row['noref']);
                $objSheet->getCell('F' . $i)->setValue($row['employee_name']);
                $objSheet->getCell('G' . $i)->setValue($row['department']);
                $objSheet->getCell('H' . $i)->setValue($row['position']);
                $objSheet->getCell('I' . $i)->setValue($row['hire_date']);
                $objSheet->getCell('J' . $i)->setValue($row['masa_kerja_tahun']);
                $objSheet->getCell('K' . $i)->setValue($row['masa_kerja_bulan']);
                $objSheet->getCell('L' . $i)->setValue($row['max_luastanah']);
                $objSheet->getCell('M' . $i)->setValue($row['max_luasbangunan']);
                $objSheet->getCell('N' . $i)->setValue($row['max_disc']);
                $objSheet->getCell('O' . $i)->setValue($row['max_disc_darimasakerja']);
                $objSheet->getCell('P' . $i)->setValue($row['tgl_pengajuan']);
                $objSheet->getCell('Q' . $i)->setValue($row['kawasan']);
                $objSheet->getCell('R' . $i)->setValue($row['blok']);
                $objSheet->getCell('S' . $i)->setValue($row['tipe_rumah']);
                $objSheet->getCell('T' . $i)->setValue($row['jenis']);
                $objSheet->getCell('U' . $i)->setValue($row['luas_tanah_total']);
                $objSheet->getCell('V' . $i)->setValue($row['luas_tanah_total_diskon']);
                $objSheet->getCell('W' . $i)->setValue($row['harga_jual_tanah_m']);
                $objSheet->getCell('X' . $i)->setValue($row['total_harga_tanah']);
                $objSheet->getCell('Y' . $i)->setValue($row['luas_bangunan_total']);
                $objSheet->getCell('Z' . $i)->setValue($row['luas_bangunan_total_diskon']);
                $objSheet->getCell('AA' . $i)->setValue($row['harga_jual_bangunan_m']);
                $objSheet->getCell('AB' . $i)->setValue($row['harga_atcost_bangunan_m']);
                $objSheet->getCell('AC' . $i)->setValue($row['total_harga_bangunan_atcost']);
                $objSheet->getCell('AD' . $i)->setValue($row['harga_pricelist']);
                $objSheet->getCell('AE' . $i)->setValue($row['kondisi_kavling']);
                $objSheet->getCell('AF' . $i)->setValue($row['diskon_sudut']);
                $objSheet->getCell('AG' . $i)->setValue($row['diskon_tusuksate']);
                $objSheet->getCell('AH' . $i)->setValue($row['total_diskon_diberikan']);
                $objSheet->getCell('AI' . $i)->setValue($row['persen_ditanggung_project']);
                $objSheet->getCell('AJ' . $i)->setValue($row['rp_ditanggung_project']);
                $objSheet->getCell('AK' . $i)->setValue($row['rp_ditanggung_projectemp']);
                $objSheet->getCell('AL' . $i)->setValue($row['harga_setelah_diskon']);
                $objSheet->getCell('AM' . $i)->setValue($row['hcproject']);
                $objSheet->getCell('AN' . $i)->setValue($row['approvedate_hcproject']);
                $objSheet->getCell('AO' . $i)->setValue($row['gmproject']);
                $objSheet->getCell('AP' . $i)->setValue($row['approvedate_gmproject']);
                $objSheet->getCell('AQ' . $i)->setValue($row['directorproject']);
                $objSheet->getCell('AR' . $i)->setValue($row['approvedate_directorproject']);
                $objSheet->getCell('AS' . $i)->setValue($row['hckp1']);
                $objSheet->getCell('AT' . $i)->setValue($row['approvedate_hckp1']);
                $objSheet->getCell('AU' . $i)->setValue($row['hckp2']);
                $objSheet->getCell('AV' . $i)->setValue($row['approvedate_hckp2']);
                $objSheet->getCell('AW' . $i)->setValue($row['directorkp']);
                $objSheet->getCell('AX' . $i)->setValue($row['approvedate_directorkp']);
                $objSheet->getCell('AY' . $i)->setValue($row['yth']);                
            }
            
            // create some borders
            // first, create the whole grid around the table
            $objSheet->getStyle('A1:AY' . $i)->getBorders()->
                    getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A1:AY' . $i)->getBorders()->
                    getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A1:AY1')->getBorders()->
                    getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

            // autosize the columns
            
            foreach (range('A', 'Z') as $c) {
                $objSheet->getColumnDimension($c)->setAutoSize(true);
            }            
            foreach (range('A', 'Y') as $c) {
                $objSheet->getColumnDimension('A'.$c)->setAutoSize(true);
            }
            
            $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
            ob_end_clean();
            $filename = 'exportdaftardisckaryawan';
            $filedata = $this->destination . $filename . date('Ymd') . "_" . $this->session->getUserId() . ".xlsx";
            $directfile = $this->httpdirect . $filename . date('Ymd') . "_" . $this->session->getUserId() . ".xlsx";
            $objWriter->save($filedata);
            return array("filedata" => $filedata, "directdata" => $directfile);
        }
}