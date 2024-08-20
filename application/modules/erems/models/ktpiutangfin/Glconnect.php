<?php

/**
 * Description of Glconnect
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Ktpiutangfin_Glconnect {

    public $errorMessage;
    public $hasilQuery;
    public $totalData;

    public function process($dbParams,$start,$limit) {



        try {
            $db = Zend_Db::factory('Pdo_Mysql', $dbParams);
           
            if ($db) {

                $innerQuery = "SELECT `jurtrh_proyek` `kode_proyek`, `jurtrh_pt` `kode_pt`, `jurtrh_no_vch` `no_vch`, `jurtrh_kode_acc` `kode_acc`, `jurtrh_no_urut` `no_urut`, `jurtrh_no_urut` `no_urut_sub`, NULL `sub_kode_sub`, 
		`jurtrh_tgl_vch` `tgl_vch`, `jurtrh_ket` `ket`, `jurtrh_mutasi` `mutasi`, `jurtrh_sts_mutasi` `sts_mutasi`, `jurtrh_flag_sub` `flag_sub`, `jurtrh_flag` `flag_posting` 
	FROM jurtrh 
	WHERE `jurtrh_flag`='*' 
		AND ((TRIM(`jurtrh_flag_sub`)='') OR (`jurtrh_flag_sub` IS NULL)) AND `jurtrh_no_vch`<>'MJ0001/01' AND 
		`jurtrh_kode_acc` IN ('11.30.110','21.50.110','21.50.120','31.10.000','31.20.100','31.20.200')

 
  -- `jurtrh_kode_acc` in (MainForm.pbl_str_CoaKartuPiutangGL) 
  
	UNION
	SELECT A.`sub_proyek` `kode_proyek`, A.`sub_pt` `kode_pt`, A.`sub_no_vch` `no_vch`, A.`sub_kode_acc` `kode_acc`, A.`sub_no_urut_acc` `no_urut`, A.`sub_no_urut_sub` `no_urut_sub`, A.`sub_kode_sub`, 
	A.`sub_tgl_vch` `tgl_vch`, A.`sub_ket` `ket`, A.`sub_nilai` `mutasi`, B.`jurtrh_sts_mutasi` `sts_mutasi`, A.`sub_kode_kel_sub` `flag_sub`, A.`sub_flag_post` `flag_posting` 
	FROM jursubgl A 
	LEFT JOIN jurtrh B ON A.`sub_proyek`=B.`jurtrh_proyek` AND A.`sub_pt`=B.`jurtrh_pt` AND A.`sub_no_vch`=B.`jurtrh_no_vch` AND A.`sub_kode_acc`=B.`jurtrh_kode_acc` 
	AND A.`sub_no_urut_acc`=B.`jurtrh_no_urut` AND A.`sub_kode_kel_sub`=B.`jurtrh_flag_sub` WHERE B.`jurtrh_proyek` IS NOT NULL AND B.`jurtrh_pt` IS NOT NULL AND 
	B.`jurtrh_no_vch` IS NOT NULL AND B.`jurtrh_kode_acc` IS NOT NULL AND B.`jurtrh_no_urut` IS NOT NULL AND B.`jurtrh_flag_sub` IS NOT NULL AND A.`sub_flag_post`='*' AND 
	((TRIM(A.`sub_kode_kel_sub`)<>'') AND (A.`sub_kode_kel_sub` IS NOT NULL)) AND A.`sub_no_vch`<>'MJ0001/01' AND 
	A.`sub_kode_acc` IN ('11.30.110','21.50.110','21.50.120','31.10.000','31.20.100','31.20.200')";

                $this->hasilQuery = $db->fetchAll("SELECT (@cnt := @cnt + 1) AS rowNumber,C.`kode_proyek`, C.`kode_pt`, C.`no_vch`, C.`kode_acc`, C.`no_urut`, C.`no_urut_sub`, C.`sub_kode_sub`,
  C.`tgl_vch`, C.`ket`, C.`mutasi`, C.`sts_mutasi`, C.`flag_sub`, C.`flag_posting` 
  FROM (".$innerQuery."
  ) AS C 
  CROSS JOIN (SELECT @cnt := 0) AS dummy
  WHERE C.`no_vch` IS NOT NULL
  LIMIT ".$start.",".$limit);
                
                $totalData = $db->fetchAll("SELECT count(*) as total
  FROM (".$innerQuery."
  ) AS C WHERE C.`no_vch` IS NOT NULL");
                $this->totalData = intval($totalData[0]["total"]);
                
         


                return TRUE;
            }
        } catch (Zend_Db_Adapter_Exception $e) {

            $this->errorMessage = "Can't connect to database";
        } catch (Zend_Exception $e) {
            $this->errorMessage = $e->getMessage();
        } catch (Exception $e) {
            $this->errorMessage = $e->getMessage();
        }
        return FALSE;
    }

}
