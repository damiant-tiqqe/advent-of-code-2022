import { assert } from 'chai';
import * as Day7 from './day7';
//import { LineType } from './day7';

describe(`Advent of Code 2022 - Day 7`, async () => {
    const examples: string[] = [
        '$ cd /',
        '$ ls',
        '187585 dgflmqwt.srm',
        'dir gnpd',
        '$ cd ..'
    ];

    it(`should get the type 'command' from a line starting with '$'`, async () => {
        const line: string = '$ cd /';
        const expected: Day7.LineType = Day7.LineType.command;

        const result: Day7.LineType = Day7.getLineType(line);

        assert.equal(result, expected);
    });

    it(`should get the type 'file' from a line starting with a number`, async () => {
        const line: string = '187585 dgflmqwt.srm';
        const expected: Day7.LineType = Day7.LineType.file;

        const result: Day7.LineType = Day7.getLineType(line);

        assert.equal(result, expected);
    });

    it(`should get the type 'directory' from a line starting with 'dir'`, async () => {
        const line: string = 'dir gnpd';
        const expected: Day7.LineType = Day7.LineType.directory;

        const result: Day7.LineType = Day7.getLineType(line);

        assert.equal(result, expected);
    });

    it(`should get file of size 187585 with name dgflmqwt.srm as object`, async () => {
        const input: string = '187585 dgflmqwt.srm';
        const expected = { name: 'dgflmqwt.srm', size: 187585 } as Day7.File;
    
        const result = Day7.toFile(input);
        assert.deepEqual(result, expected);
    });

    it(`should get directory with name gnpd as object`, async () => {
        const input: string = 'dir gnpd';
        const expected = { name: 'gnpd', files:  [], folders: [] } as Day7.Folder;
    
        const result = Day7.toDirectory(input);
        assert.deepEqual(result, expected);
    });

    it(`should add a sub folder to a folder when in LS state`, async () => {
        const input: string = 'dir gnpd';
        const currentFolder: Day7.Folder = { name: '/', files: [], folders: []} as Day7.Folder;
        const currentState: Day7.State = Day7.State.ls;
        const expected = { 
            name: '/', 
            files: [], 
            folders: [{ name: 'gnpd', files:  [], folders: [], parent: currentFolder }]
        } as Day7.Folder;
    
        const result:Day7.Folder = Day7.buildFolder(currentFolder, input, currentState);
        assert.deepEqual(result, expected);
    });
    
    it(`should add a file to a folder when in LS state`, async () => {
        const input: string = '187585 dgflmqwt.srm';
        const currentFolder: Day7.Folder = { name: '/', files: [], folders: []} as Day7.Folder;
        const currentState: Day7.State = Day7.State.ls;
        const expected = { 
            name: '/', 
            files: [{ name: 'dgflmqwt.srm', size: 187585 }], 
            folders: []
        };

        const result:Day7.Folder = Day7.buildFolder(currentFolder, input, currentState);
        assert.deepEqual(result, expected);
    });

    it(`should change current directory to a subfolder with command 'cd <name>'`, async () => {
        const input: string = '$ cd gnpd';
        const currentFolder = { 
            name: '/', 
            files: [], 
            folders: [{ name: 'gnpd', files:  [], folders: [], parent: undefined }]
        } as Day7.Folder;
        currentFolder.folders.find(x => x.name === 'gnpd').parent = currentFolder;
        const expectedBreadcrumb = ['/', 'gnpd'];

        const breadcrumb: string[] = ['/'];
        //const currentState: Day7.State = Day7.State.navigate;

        const newBreadcrumb = Day7.changeDirectory(input, breadcrumb);
        assert.deepEqual(newBreadcrumb, expectedBreadcrumb);
        //assert.equal(currentState, Day7.State.cd_in);

    });
    
    it(`should change current directory to a parent folder with command 'cd ..'`, async () => {
        const input: string = '$ cd ..';
        const parentFolder = { 
            name: '/', 
            files: [], 
            folders: [{ name: 'gnpd', files:  [], folders: [], parent: undefined }]
        } as Day7.Folder;
        const currentFolder = { 
            name: 'gnpd', 
            files: [], 
            folders: [{ name: 'gnpd', files:  [], folders: [], parent: parentFolder }]
        } as Day7.Folder;
        parentFolder.folders.find(x => x.name === 'gnpd').parent = parentFolder;
        const expectedBreadcrumb = ['/'];

        const breadcrumb: string[] = ['/', 'gnpd'];
        //const currentState: Day7.State = Day7.State.navigate;

        const newBreadcrumb = Day7.changeDirectory(input, breadcrumb);
        assert.deepEqual(newBreadcrumb, expectedBreadcrumb);
        //assert.equal(currentState, Day7.State.cd_out);

    });

});