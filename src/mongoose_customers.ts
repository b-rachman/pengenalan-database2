import mongoose from 'mongoose'  

export type TipePengguna = {
   nama_awal: string
   nama_akhir: string
   umur: number
   tipe_pengguna: string
   jalan: string
   kota: string
   negara: string
   kode_pos: string
   nomor_hp: string
   tanggal_daftar: Date
}

export type DokumenPengguna = mongoose.Document & TipePengguna


const SkemaPengguna = new mongoose.Schema({
   nama_awal: { type: String, required: true },
   nama_akhir: { type: String, required: true },
   umur: { type: Number, required: true },
   tipe_pelanggan: { type: String, required: true },
   jalan: { type: String, required: true },
   kota: { type: String, required: true },
   negara: { type: String, required: true },
   kode_pos: { type: String, required: true },
   nomor_hp: { type: String, required: true },
   tanggal_daftar: { type: Date, required: true }
})

export class Pengguna {
   private model: mongoose.Model<DokumenPengguna>

   constructor() {
      this.model = mongoose.model('customer', SkemaPengguna)
   }

   async buat(data: TipePengguna) {
      try {
         const hasil = await this.model.create(data)
         console.log('Memasukkan hasil %j', hasil)
      } catch (error) {
         throw error
      }
   }

   async ambilSemua() {
      let paraPengguna: TipePengguna[]
      try {
         paraPengguna = await this.model.find({})
      } catch (error) {
         throw error
      }
      return paraPengguna
   }

   async ambilSesuaiID(IDPengguna: string) {
      let paraPengguna: TipePengguna | null
      try {
         paraPengguna = await this.model.findById(IDPengguna)
      } catch (error) {
         throw error
      }
      return paraPengguna
   }

   async perbarui(IDPengguna: string, dataPengguna: Partial<TipePengguna>) {
      try {
         await this.model.findByIdAndUpdate(IDPengguna, { $set: dataPengguna })
      } catch (error) {
         throw error
      }
   }

   async hapus(IDPengguna: string) {
      try {
         await this.model.findByIdAndDelete(IDPengguna)
      } catch (error) {
         throw error
      }
   }
}