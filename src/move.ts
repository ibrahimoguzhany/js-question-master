export type List = Folder[];

type File = { id: string; name: string };

type Folder = {
  id: string;
  name: string;
  files: File[];
};

export default function move(list: List, source: string, destination: string): List {
  // folder.id !== source kontrolu throws error if given source is not a file testi icin eklendi. Source tasiyacagimiz File'in id'si oluyor. Bu sebeple source folder'larin idlerinde bulunmamali.
  const sourceFolderIndex =
    // source tasiyacagimiz File'in id'sine esit olmali fakat list'in icindeki folder'larin id'sine esit olmamali. Bulamazsa,  error handling icin -1 gibi bir flag ile sourceFolderIndex'e atama yapiyorum.
    list.findIndex(
      (folder) => folder.files.some((file) => file.id === source) && folder.id !== source,
    ) ?? -1;
  if (sourceFolderIndex === -1) throw new Error('You cannot move a folder');

  // sourceFolderIndex source'a esit File id'ye sahip File'in indexini aliyoruz ki tasima isleminden once bu File'i cikaralim.
  const sourceFileIndex = list[sourceFolderIndex].files.findIndex((file) => file.id === source);

  //  destinationFolderIndex destination'a esit Folder id'ye sahip ve ayni zamanda source folder'in id'sine esit olmamali ki destination olarak file belirlenmesin.
  const destinationFolderIndex =
    list.findIndex((folder) => folder.id === destination && folder.id !== source) ?? -1;
  if (destinationFolderIndex === -1)
    throw new Error('You cannot specify a file as the destination');

  // tasiyacagimiz dosyayi siliyoruz ve sildigimiz dosya tasinacak dosya oldugu icin sourceFile degiskenine donduruyoruz. (splice sildigi elemanlari dondurur array icinde dondurur.)
  const sourceFile = list[sourceFolderIndex].files.splice(sourceFileIndex, 1)[0];

  // tasinacak File hedef folder'da bulunuyorsa hata vermeli.
  if (list[destinationFolderIndex].files.map((file) => file.id).includes(sourceFile.id)) {
    throw new Error(
      'You cannot move a file into a folder that already contains a file with the same source file id',
    );
  }

  list[destinationFolderIndex].files.push(sourceFile);

  return list;
}
