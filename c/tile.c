#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#define WIDTH 6;
int width = 6;
int height = 8;
struct TILE {
    int width;
    int height;
    int left;
    int top;
};
struct TILE blocks[7] = {
    {4,4,0,0},
    {4,4,0,0},
    {2,2,0,0},
    {2,2,0,0},
    {2,2,0,0},
    {2,2,0,0}
};
struct TILE matrix[6][8];
int main(int argc, char* argv[])
{
    
    return 0;
}

void initialize(void)
{

}