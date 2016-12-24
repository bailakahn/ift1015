// Author: Alexandre Brilhante

/* Prints out a labyrinth with a single solution using turtle graphics. */

var laby = function(nx, ny, step) {
    var hWalls = iota(nx+ny*nx);
    var vWalls = iota((nx+1)*ny);
    var x = (Math.floor(nx*Math.random()));
    var y = (Math.floor(ny*Math.random()));
    var cave = [x+y*nx];
    var front = neighbors (x, y, nx, ny);
    remove(hWalls, 0);
    remove(hWalls, (nx+ny*nx)-1);
    while (cave.length < nx*ny) {
        var cell = front[Math.floor(Math.random()*front.length)];
        var xCoordinate = cell%nx;
        var yCoordinate = (cell-xCoordinate)/nx;
        var cellNeighrbors = neighbors(xCoordinate, yCoordinate, nx, ny);
        var temp = [];
        for (var i = 0; i < cellNeighrbors.length; i++) {
            if (contains(cave, cellNeighrbors[i])) {
                temp.push(cellNeighrbors[i]);
            } 
            else { 
                (front = add(front, cellNeighrbors[i]));
            }
        }
        var newCell = temp[Math.floor(Math.random()*temp.length)];
        if (cell-newCell == 1) {
           vWalls = remove(vWalls, xCoordinate+yCoordinate*(nx+1));
        }
        else if (cell-newCell == -1) {
           vWalls = remove(vWalls, 1+xCoordinate+yCoordinate*(nx+1));
        }
        else if (cell-newCell==nx) {
           hWalls = remove(hWalls, xCoordinate+yCoordinate*nx);
        }
        else if (cell-newCell==-nx) {
           hWalls = remove(hWalls, xCoordinate+(yCoordinate+1)*nx);
        }
        add(cave, cell);
        remove(front, cell);
    }
    draw(hWalls, vWalls, nx, ny, step);
};

var draw = function (hWalls, vWalls, nx, ny, step) {
    pu();
    rt(90);
    bk(nx*step/2);
    lt(90);
    fd(ny*step/2);
    rt(90);
    var h = 0;
    var v = ((nx+1)*ny)-1-nx;
    for (var i = 0; i <= ny; i++) {
        for (var j=0; j < nx; j++) { 
            if (contains(hWalls, h)) { 
                pd();
                fd(step); 
                h++; 
            }
            else { 
                pu(); 
                fd(step);
                pd(step);
                h++; 
            } 
        }
        pu();
        bk(nx*step);
        rt(90);
        fd(step);
        lt(90); 
    } 
    lt(90);
    fd(step);
    for (var i = 0; i <= nx; i++) {
        for (var j = 0; j < ny; j++) { 
            if (contains(vWalls, v)) { 
                pd();
                fd(step); 
                v -= (nx+1); 
            } 
            else { 
                pu(); 
                fd(step);
                pd();
                v -= (nx+1); 
            } 
        }
        pu();
        bk(ny*step);
        rt(90);
        fd(step);
        lt(90);
        pd();
        v += (nx+1)*ny+1;
    }
};

var iota = function(n) {
    var tab = [];
    for (var i = 0; i < n; i++) {
        tab.push(i);
    }
    return tab;
};

var contains = function(tab, x) {
    for (var i = 0; i < tab.length; i++) {
        if (tab[i] == x) {
            return true;
        } 
    }
    return false;
};

var add = function(tab, x) {
    if (contains(tab, x) == false) {
        tab.push(x);
    }
    return tab;
};

var remove = function(tab, x) {
    if (contains(tab, x) == true) {
        for (var i = 0; i < tab.length; i++) {
            if (tab[i] == x) { 
                tab.splice(i, 1);
            }
        }
    }
    return tab;
};

var neighbors = function(x, y, nx, ny) {
    var temp;
    var N = x+y*nx;
    if (x == 0 && y == 0) {
        temp = [N+nx, N+1];
    }
    else if (x == 0 && (y <= ny-2 && y != 0)) {
        temp = [N-nx, N+nx, N+1];
    }
    else if (x == 0 && y == ny-1) {
        temp = [N-nx, N+1];
    }
    else if (x == nx-1 && y == 0) {
        temp = [N-1,N+nx];
    }
    else if (x == nx-1 && y == ny-1) {
        temp = [N-nx, N-1];
    }
    else if (x == nx-1 && (y <= ny-2 && y != 0)) {
        temp = [N-nx, N-1, N+nx];
    }
    else if (y == ny-1 && (x != 0 && x <= nx-2)) {
        temp = [N-nx, N-1, N+1];
    }
    else if (y == 0 && (x <= nx-2 && x != 0)) {
        temp = [N-1, N+nx, N+1];
    }
    else if ((y != 0 && y <= ny-2) && (x != 0 && x <= nx-2)) {
        temp = [N-nx, N-1, N+nx, N+1];
    }
    temp.sort();
    return temp;
};