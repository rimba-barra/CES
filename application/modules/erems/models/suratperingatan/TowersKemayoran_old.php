<?php

/**
 * Description of Default
 *
 * @author David-MIS
 */
class Erems_Models_Suratperingatan_TowersKemayoran {

	function tgl_indo($tanggal){
		$bulan = array (
			1 =>   'Januari',
			'Februari',
			'Maret',
			'April',
			'Mei',
			'Juni',
			'Juli',
			'Agustus',
			'September',
			'Oktober',
			'November',
			'Desember'
		);
		$pecahkan = explode('-', $tanggal); 
		return $pecahkan[2] . ' ' . $bulan[ (int)$pecahkan[1] ] . ' ' . $pecahkan[0];
	}

    public function getListTagihanHTML($params){
        $schedule = $params["schedule"][0];
        $total = 0.0;
        $ttldenda_terlambatb=0;
        $ttlremaining_balance=0;
        $table = "";

        foreach($schedule as $row){
            if($row['indicatorname'] == 'denda'){
                $denda = $row["remaining_denda"];
            }else{
                $denda = $row["denda_terlambatb"];
            }
				
            $ttldenda_terlambatb=$ttldenda_terlambatb+$denda;
            $ttlremaining_balance=$ttlremaining_balance+$row["remaining_balance"];
            $table .='<tr style="border: 1px solid black;">
                        <td style="border: 1px solid black;">'.$row["scheduletype"].'</td>
                        <td style="border: 1px solid black;">'.$row["termin"].'</td>
                        <td style="border: 1px solid black;">'.$this->tgl_indo(date('Y-m-d',strtotime($row["duedate"]))).'</td>
                        <td align="right" style="border: 1px solid black;">Rp. '.number_format($row["remaining_balance"]).'</td>
                        <td align="right" style="border: 1px solid black;">Rp. '.number_format($denda).'</td>
                        <td align="right" style="border: 1px solid black;">Rp. '.number_format($row["remaining_balance"]+$denda).'</td>
                    </tr>';
        }

        $table .='<tr><td>&nbsp</td><td>&nbsp</td><td>Total </td><td align="right">Rp. '.number_format($ttlremaining_balance).'</td>
                <!--<td></td><td></td>--> <td align="right">Rp. '.number_format($ttldenda_terlambatb).'</td><td align="right">Rp. '.number_format($ttlremaining_balance+$ttldenda_terlambatb).'</td></tr>';

        return $table;
    }
    
    public function getHTMLdefault(){
       return $this->getHTML();
    }

    public function getHTML($spke=null,$data){
        // var_dump($data);
        $word = "";
        if($data['is_printpreview'] == 1){
            $namafile = trim($data['cluster'].'_'.$data['unit_number']).'_'.date('d-m-Y'); 
            $word = "
                <script>
                    function Export2Doc(element, filename = ''){
                        var preHtml = \"<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>\";
                        var postHtml = \"</body></html>\";
                        var html = preHtml+document.getElementById(element).innerHTML+postHtml;
                        var blob = new Blob(['\ufeff', html], {
                            type: 'application/msword'
                        });
                        var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
                        filename = filename?filename+'.doc':'document.doc';
                        var downloadLink = document.createElement('a');
                        document.body.appendChild(downloadLink);
                        if(navigator.msSaveOrOpenBlob ){
                            navigator.msSaveOrOpenBlob(blob, filename);
                        }else{
                            downloadLink.href = url;
                            downloadLink.download = filename;
                            downloadLink.click();
                        }                        
                        document.body.removeChild(downloadLink);
                    }
                </script>
                <button onclick=\"Export2Doc('exportContent', '$namafile');\">Export as .doc</button>";
        }
		
		if($spke==1){
            $sp_ke_before = $spke;
            $no_sp_before = $data['sp1'];
            $tgl_sp_before = $data['sp1_date'];
        }
        elseif($spke==2){
            $sp_ke_before = $spke-1;
            $no_sp_before = $data['sp1'];
            $tgl_sp_before = $data['sp1_date'];
        }
        elseif($spke==3){
            $sp_ke_before = $spke-1;
            $no_sp_before = $data['sp2'];
            $tgl_sp_before = $data['sp2_date'];
        }
        else{
            $sp_ke_before = $spke-1;
            $no_sp_before = $data['sp3'];
            $tgl_sp_before = $data['sp3_date'];
        }
		
		if($data['total_schedule'] > 4){
			$page_break = "<div style='page-break-before:always;'><br/><br/><br/><br/></div>";
			// $page_break = "";
		}else{
			$page_break = "";
		}
        $tpl1=
        '<style>
                table {
                    border-collapse: collapse;
                }
                table, td, th {
                    border: 1px solid black;
                    font-size:12px;
                }
                td{
                    padding:2px 10px;
                }
                body{
                    font-family: "Comic Sans MS", "Comic Sans", cursive;
                }
                p.spstyle_p, div {
                    font-size: 12px;
                }
                p.spstyle_p_small{
                    font-size: 10px;
                
                }
                .amiddle{
                    text-align: justify;
                    text-justify: inter-word;
                }
                </style>
                <body>				
				<br/>
				<p class="spstyle_p">Jakarta, <b>{{tanggal_print_w}}</b></p>
                <p class="spstyle_p">No : <b>'.$data['nomor_sp_teratas'].'</b><br/>
                    Hal : <b>Surat Pemberitahuan {{max_sp}}</b></p>
                <br/>
                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br/>
                    Bapak/Ibu <b>{{customer_name}}</b><br/>
                    {{customer_address}}</p>

				<br/>
                <p class="spstyle_p">Dengan Hormat,<br/>
                <div class="amiddle">';
            
            $tpl2 = 
                'Menindaklanjuti Surat Pemberitahuan '.$sp_ke_before.'  No. '.$no_sp_before.' tertanggal '.$tgl_sp_before.'. ';

            $tpl3 = 
                'Melalui surat ini kami informasikan kepada Bapak/Ibu {{customer_name}} selaku pembeli unit office <b>{{cluster}}</b> <b>{{unit_number}}</b>, bahwa berdasarkan catatan kami, Bapak/Ibu sampai dengan tanggal <b>{{tanggal_print_w}}</b> masih belum melaksanakan pembayaran angsuran yang telah <b>jatuh tempo</b>. Atas hal tersebut, total tunggakan angsuran dan denda yang harus diselesaikan menjadi sebagai berikut (dalam rupiah):
                </div>
                
                <table>
					<tbody>
						<tr style="background-color: #e8e9ea;font-weight: bold;">
							<td>Tagihan</td>
							<td>Termin</td>
							<td>Tanggal Jatuh Tempo</td><td>Nilai Tagihan</td>
							<!--<td>Keterlambatan (hari) </td><td>Nomor SP - Tanggal SP</td>-->
							<td>Denda Keterlambatan <br>( s/d {{max_date}} )*</td>
							<td>Total Dibayar <br>( s/d {{max_date}} )*</td>
						</tr> 
                {{{list_tagihan}}}
                </tbody></table>
                
                <div class="amiddle">               
                Sehubungan dengan hal diatas, mohon Bapak/Ibu dapat segera melakukan pembayaran dengan cara:<br/>  
                <table style="border:none;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">a.</td>
                        <td align="justify" style="border:none;">
                            Transfer ke : <b>CITRA PEMBINA SUKSES JO a/c. NO REK. 118-00-4500-6789 BANK MANDIRI Cab. Citra 2 Ext Jakarta atau NO REK. 6840-970-688 BANK BCA</b>. Mohon mencantumkan nomor unit office dan nama pemesan pada kolom berita di slip transfer (bukti transfer mohon <b>di email ke septian.hangga@ciputra.co.id</b> dan segera ditukar dengan kwitansi Citra Towers Kemayoran), atau
                        </td>
                    </tr>
                    <tr>
                        <td valign="top" style="border:none;" width="1" align="left">b.</td>
                        <td align="justify" style="border:none;">
                            Membayar langsung ke kasir penerimaan <b>City Management Office, Citra 2 Ext. Blok BG.2A No.01, Citra Garden City, Jakarta Barat</b> dengan cash, giro/cek jatuh tempo, debit MANDIRI atau debit BCA.
                        </td>

                    </tr>
                </table>              

                <br>

                Kami memberikan waktu sampai dengan tanggal <b>{{max_date_w}}</b> untuk penyelesaian pembayaran diatas. Untuk tindak lanjut penyelesaian dapat menghubungi sdr <b>Hangga</b> di <b>no. telp. (021) 6198177 ext 743</b>
                 <br/><br/>

                 ';

            $tpl6 = ', kami tegaskan kepada Bapak/Ibu selaku pembeli unit office Blok <b>{{unit_number}}</b> kawasan {{cluster}}, bahwa pemesanan unit office tersebut menjadi batal.
                    <br/>
                    Keseluruhan uang yang telah Bapak/Ibu bayarkan  tidak dapat dikembalikan. Dengan demikian kami berhak menjual kembali unit office tersebut kepada pihak lain. 
                     
                    <br/>
					'.$page_break.'
                    Demikian hal ini kami sampaikan. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.

                <br/><br/> ';    

            $tpl4 =  '
                Apabila lewat dari tanggal tersebut diatas Bapak/Ibu masih belum melunasinya, maka dengan sangat menyesal kami mengganggap Bapak/Ibu membatalkan pemesanan unit office tersebut. Keseluruhan uang yang telah Bapak/Ibu bayarkan tidak dapat dikembalikan. Dengan demikian kami berhak menjual kembali unit office tersebut kepada pihak lain
                 <br/><br/>';

            $tpl5 .= ''.$page_break.'
				Demikian hal ini kami sampaikan, atas perhatian dan kerjasama yang baik dari Bapak/Ibu  kami ucapkan terima kasih.
                </div>
                <br/>
                <p class="spstyle_p">
                Hormat Kami,</br>
                <b>CITRA PEMBINA SUKSES JO</b>
                <br/>
                <br/>
                <br/>
                <br/>
                <u><b>SINTHIA ADRYANTO</b></u><br/>
                <!--Manager Keuangan-->
                Finance Manager<br>
                CC : - Direktur Proyek<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Legal
                </p>

                <p class="spstyle_p_small"><u>*Note : Apabila pada saat surat ini diterima Bapak/Ibu telah melakukan transfer ke rekening kami, mohon untuk segera   menghubungi kami, sehingga kami dapat melakukan pengecekan lebih lanjut.</u></p>

                </body>
                ';
        if($spke==1){
            $tpl = $tpl1.$tpl3.$tpl5;
        }
        elseif($spke==2){
            $tpl = $tpl1.$tpl2.$tpl3.$tpl5;
        }
        elseif($spke==3){
            $tpl = $tpl1.$tpl2.$tpl3.$tpl4.$tpl5;
        }
        elseif($spke==4){
            $tpl = $tpl1.$tpl2.$tpl6.$tpl5;
        }else{
            $tpl = $tpl1.$tpl3.$tpl5;
        }
        
        return $word.'<div id="exportContent">'.$tpl.'</div>';
    }
    
}
