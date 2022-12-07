import * as Util from './util';

export enum LineType {
    command,
    file,
    directory
}

export enum State {
    unknown,
    navigate,
    ls,
}

export interface Folder {
    name: string;
    files: File[];
    folders: Folder[];
    parent: Folder | undefined;
}

export interface File {
    name: string;
    size: number;
}

export interface FolderDetails {
    name: string;
    files: string[];
    path: string;
    size: number;
}

export const run = () => {
    console.log(`----------- Day 7 -----------`);
    const dataRaw = Util.readDataFile('data/day7/input.txt');

    const breadcrumbSeparator: string = '\\';
    const simple: FolderDetails[] = [];
    let breadcrumb: string[] = [];


    for (let i = 0; i < dataRaw.length; i++) {
        const element = dataRaw[i];
        if (!element) {
            continue;
        }
//            console.log(element);

        const lineType = getLineType(element);

        if (lineType === LineType.command) {
            if (isChangeDirectoryCommand(element)) {

                breadcrumb = changeDirectory(element, breadcrumb);
                //console.log(breadcrumb.join(' # '))

                const test = simple.find(x => x.path === breadcrumb.join(breadcrumbSeparator))
                if (!test) {
                    simple.push({name: Util.peek(breadcrumb), path: breadcrumb.join(breadcrumbSeparator), size: 0, files: [] } as FolderDetails);
                }
            }
        }
        else if (lineType === LineType.file) {
            const file = toFile(element);
            const path = breadcrumb.join(breadcrumbSeparator);
            const currentFolder = simple.find(x => x.path === path);
            if (!currentFolder) {
                throw new Error(`invalid folder path: ${path}`);
            }
            currentFolder.files.push(file.name);

            simple.filter(x => path.startsWith(x.path)).forEach((s) => { 
                s.size += file.size;
            });
        } 
        else if (lineType === LineType.directory) {
            const dir = toDirectory(element);
            const path = breadcrumb.join(breadcrumbSeparator) + breadcrumbSeparator + dir.name;
            const currentFolder = simple.find(x => x.path === path);
            if (!currentFolder) {
                simple.push({name: dir.name, path: path, size: 0, files: [] } as FolderDetails)
            }
        }
    }

    const under100k = simple.filter(x => x.size < 100000);
    const totalSize = Util.sumArray(under100k.map(x => x.size));
    console.log(`Part 1: Total size of directories under 100k: ${totalSize}`);

    const totalDiskSpace: number = 70000000;
    const requiredUnused: number = 30000000;

    const totalUsedSpace: number = simple.find(x => x.name === '/').size;
    const currentUnused: number = totalDiskSpace - totalUsedSpace;
    const spaceToFree: number = requiredUnused - currentUnused;

    const foldersBigEnoughToFreeSpace = simple.filter(x => x.size >= spaceToFree);
    const sortedForDelete = foldersBigEnoughToFreeSpace.sort((a,b) => { return a.size - b.size });

    console.log(`Part 2: Size of smallest directory to delete to free up space needed '${sortedForDelete[0].name}' ${sortedForDelete[0].size}`);
}

function isChangeDirectoryCommand(element: string) {
    return element.split(' ')[1] === 'cd';
}

export function getLineType(line: string): LineType {
    if (!line || !line.length) {
        throw new Error('Invalid input.');
    }

    const split = line.split(' ');
    if (!split || !split.length) {
        throw new Error('Invalid input.');
    }

    if (split[0] === '$') {
        return LineType.command;
    }

    if (!isNaN(+split[0])) {
        return LineType.file;
    }

    if (split[0] === 'dir') {
        return LineType.directory;
    }

 
    throw new Error('Unknown line type input.');
}
export function toFile(line: string) {
    if (!line || !line.length) {
        throw new Error('Invalid input.');
    }

    const split = line.split(' ');
    const size = +split[0];
    if (isNaN(size)) {
        throw new Error('Invalid input.');
    }

    return { name: split[1], size } as File;

}

export function toDirectory(line: string) {
    if (!line || !line.length) {
        throw new Error('Invalid input.');
    }

    const split = line.split(' ');

    return { name: split[1], files: [], folders: [] } as Folder;
}

export function buildFolder(current: Folder, input: string, state: State): Folder {
    const newFolder: Folder = {...current};

    if (state !== State.ls) {
        return newFolder;
    }
    
    const lineType = getLineType(input);
    switch(lineType as LineType) {
        case LineType.file:
            newFolder.files.push(toFile(input));
            break;
        case LineType.directory:
            const subFolder = toDirectory(input);
            subFolder.parent = current;
            newFolder.folders.push(subFolder);
            break;
        
    }
    
    return newFolder;
}
export function changeDirectory(line: string, breadcrumb: string[]) {
    const newbreadcrumb = [... breadcrumb];

    const lineType: LineType = getLineType(line);

    if (lineType !== LineType.command) {
        throw new Error('error');
    }

    const split = line.split(' ');
    const cmd: string = split[2];

    switch (cmd) {
        case '..':
            // const parentFolder = currentFolder.parent;
            newbreadcrumb.pop();
            break;
        case '/':
            const resetBreadcrumb = breadcrumb && breadcrumb.length ? breadcrumb.splice(1) : ['/'];
            return resetBreadcrumb;
        default: 
            //const subFolder = currentFolder.folders.find(x => x.name === split[2]);
            newbreadcrumb.push(split[2]);
            break;
    }
    return newbreadcrumb;
}

export function getCommandType(line: string): State {

    const lineType: LineType = getLineType(line);

    if (lineType !== LineType.command) {
        throw new Error('error');
    }

    const split = line.split(' ');
    const cmdType: string = split[1];

    switch(cmdType) {
        case 'cd':
            return State.navigate;
        case 'ls':
            return State.ls;
        default:
            return State.unknown;
    }
}

