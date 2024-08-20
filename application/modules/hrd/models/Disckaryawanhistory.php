<?php

class Hrd_Models_Disckaryawanhistory extends Zend_Db_Table_Abstract
{
	protected $_schema		= 'hrd';
	protected $_name 		= 't_discsaldo';	
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
					$param['project_id'], 
					$param['pt_id'], 
					$param['start'], 
					$param['limit'],
					$this->session->getUserId()
				);
				$result = $this->execSP3('sp_dischistory_read', $data);
				$return['total'] = $result[0][0]['RECORD_TOTAL'];
				$return['data'] = $result[1];			
				$return['success'] = true;				
			} catch(Exception $e) { 
                            //var_dump($e);                         
                        }
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
            $objSheet->setTitle('export history diskon karyawan');
            // let's bold and size the header font and write the header
            // as you can see, we can specify a range of cells, like here: cells from A1 to A4
            $objSheet->getStyle('A1:AZ1')->getFont()->setBold(true)->setSize(12);

            // write header

            $objSheet->getCell('A1')->setValue('Project');
            $objSheet->getCell('B1')->setValue('PT');
            $objSheet->getCell('C1')->setValue('Employee Name');
            $objSheet->getCell('D1')->setValue('Add On');
            $objSheet->getCell('E1')->setValue('Amount (Rp)');
            $objSheet->getCell('F1')->setValue('Tanah (m2)');
            $objSheet->getCell('G1')->setValue('Bangunan (m2)');
            $objSheet->getCell('H1')->setValue('Description');
            $objSheet->getCell('I1')->setValue('Referensi Tanggal Pengajuan');
            $objSheet->getCell('J1')->setValue('No Referensi');

            $i = 1;
            foreach ($data as $row) {
                $i++;
                $objSheet->getCell('A' . $i)->setValue($row['project_name']);
                $objSheet->getCell('B' . $i)->setValue($row['pt_name']);
                $objSheet->getCell('C' . $i)->setValue($row['employee_name']);
                $objSheet->getCell('D' . $i)->setValue($row['addon']);
                $objSheet->getCell('E' . $i)->setValue($row['amount']);
                $objSheet->getCell('F' . $i)->setValue($row['tanah']);
                $objSheet->getCell('G' . $i)->setValue($row['bangunan']);
                $objSheet->getCell('H' . $i)->setValue($row['description']);           
                $objSheet->getCell('I' . $i)->setValue($row['tgl_pengajuan']);      
                $objSheet->getCell('J' . $i)->setValue($row['noref']);
            }

            // create some borders
            // first, create the whole grid around the table
            $objSheet->getStyle('A1:J' . $i)->getBorders()->
                    getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A1:J' . $i)->getBorders()->
                    getOutline()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
            $objSheet->getStyle('A1:J1')->getBorders()->
                    getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);

            // autosize the columns
            foreach (range('A', 'J') as $c) {
                $objSheet->getColumnDimension($c)->setAutoSize(true);
            }            

            $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
            ob_end_clean();
            $filename = 'exporthistorydisckaryawan';
            $filedata = $this->destination . $filename . date('Ymd') . "_" . $this->session->getUserId() . ".xlsx";
            $directfile = $this->httpdirect . $filename . date('Ymd') . "_" . $this->session->getUserId() . ".xlsx";
            $objWriter->save($filedata);
            return array("filedata" => $filedata, "directdata" => $directfile);
        }
}