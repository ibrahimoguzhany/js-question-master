import move, { List } from './move';

describe('move', () => {
  it('moves given file to another folder', () => {
    const list: List = [
      {
        id: '1',
        name: 'Folder 1',
        files: [
          { id: '2', name: 'File 1' },
          { id: '3', name: 'File 2' },
          { id: '4', name: 'File 3' },
          { id: '5', name: 'File 4' },
        ],
      },
      {
        id: '6',
        name: 'Folder 2',
        files: [{ id: '7', name: 'File 5' }],
      },
    ];

    const result: List = [
      {
        id: '1',
        name: 'Folder 1',
        files: [
          { id: '2', name: 'File 1' },
          { id: '3', name: 'File 2' },
          { id: '5', name: 'File 4' },
        ],
      },
      {
        id: '6',
        name: 'Folder 2',
        files: [
          { id: '7', name: 'File 5' },
          { id: '4', name: 'File 3' },
        ],
      },
    ];

    expect(move(list, '4', '6')).toStrictEqual(result);
  });

  it('throws error if given source is not a file', () => {
    // bu test ayni zamanda source id'ye ait bir file yoksa da hata veriyor. bu testing sourceId'ye sahip bir file var mi yok mu durumunu da kapsadigindan bahseden bir aciklama yazilabilir. "throws error if given source is not a file and throws error if given source is not found" gibi.
    const list: List = [
      {
        id: '1',
        name: 'Folder 1',
        files: [{ id: '2', name: 'File 1' }],
      },
      {
        id: '3',
        name: 'Folder 2',
        files: [],
      },
    ];

    expect(() => move(list, '3', '1')).toThrow('You cannot move a folder');
    // id'si 3 olan bir file yok. Bu test icinde kurulan setup'a gore id'si 3 olan file var mi yok mu diye de kontrol sagliyor. Source file var mi yok mu kontrolu icin ayri bir test yazilabilir. Yazilacak bu teste 'a' diyelim.
  });

  it('throws error if given destination is not a folder', () => {
    const list: List = [
      {
        id: '1',
        name: 'Folder 1',
        files: [{ id: '2', name: 'File 1' }],
      },
      { id: '3', name: 'Folder 2', files: [{ id: '4', name: 'File 2' }] },
    ];

    expect(() => move(list, '2', '4')).toThrow('You cannot specify a file as the destination');
  });

  // destination folder must not contain a file with the same source file id
  it('throws error if destination folder contains a file that has the same id with the source file.', () => {
    const list: List = [
      {
        id: '1',
        name: 'Folder 1',
        files: [{ id: '2', name: 'File 1' }],
      },
      {
        id: '3',
        name: 'Folder 2',
        files: [{ id: '2', name: 'File 2' }],
      },
    ];

    expect(() => move(list, '2', '3')).toThrow(
      'You cannot move a file into a folder that already contains a file with the same source file id',
    );
  });
});
