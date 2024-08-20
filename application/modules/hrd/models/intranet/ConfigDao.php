<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Jenisdokumen
 *
 * @author MIS
 */
class Hrd_Models_Intranet_ConfigDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    public function getProjectconfig($project_id) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_project_byid_read', $project_id);
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        
    }

}

?>
