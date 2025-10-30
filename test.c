/*
 * test.c
 * 簡単なひな形
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

#define VERSION "0.1.0"

static void usage(const char *prog) {
    fprintf(stderr, "Usage: %s [options]\n", prog);
    fprintf(stderr, "Options:\n");
    fprintf(stderr, "  -h, --help    Show this help\n");
    fprintf(stderr, "  -v, --version Show version\n");
}

/* サンプル関数 */
int add(int a, int b) {
    return a + b;
}

int main(int argc, char *argv[]) {
    if (argc > 1) {
        if (strcmp(argv[1], "-h") == 0 || strcmp(argv[1], "--help") == 0) {
            usage(argv[0]);
            return EXIT_SUCCESS;
        }
        if (strcmp(argv[1], "-v") == 0 || strcmp(argv[1], "--version") == 0) {
            printf("%s\n", VERSION);
            return EXIT_SUCCESS;
        }
    }

    /* ここにメイン処理を書く */
    int x = 2, y = 3;
    printf("add(%d, %d) = %d\n", x, y, add(x, y));

    return EXIT_SUCCESS;
}