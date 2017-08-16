<?php remove_action('wp_head', 'wp_generator'); ?>
<?php
add_filter('xmlrpc_enabled', '__return_false');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
?>

<?php
if ( ! function_exists( 'basictheme_setup' ) ) :

function basictheme_setup() {
	/*
	* Make theme available for translation.
	* Translations can be filed in the /languages/ directory.
	* If you're building a theme based on BasicTheme, use a find and replace 
	* to change 'basictheme' to the name of your theme in all the template files
	*/
		load_theme_textdomain( 'basictheme', get_template_directory() . '/languages' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	// Included img logo in the Header
	add_theme_support( 'custom-logo' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
	 */
	add_theme_support( 'post-thumbnails' );
	set_post_thumbnail_size( 1200, 9999 );

	// This theme uses wp_nav_menu() in two locations.
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'basictheme' ),
		'social'  => __( 'Social Links Menu', 'basictheme' ),
	) );

	// Enable HTML5 support
	add_theme_support('html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );
}
endif; // theme_setup
add_action( 'after_setup_theme', 'basictheme_setup' );



/**
 * Registers a widget area.
 *
 * @link https://developer.wordpress.org/reference/functions/register_sidebar/
 *
 * @since Foton 1.0
 */
function basictheme_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Sidebar', 'basictheme' ),
		'id'            => 'sidebar-1',
		'description'   => __( 'Add widgets here to appear in your sidebar.', 'basictheme' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

	register_sidebar( array(
		'name'          => __( 'Content Bottom 1', 'basictheme' ),
		'id'            => 'sidebar-2',
		'description'   => __( 'Appears at the bottom of the content on posts and pages.', 'basictheme' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

	register_sidebar( array(
		'name'          => __( 'Content Bottom 2', 'basictheme' ),
		'id'            => 'sidebar-3',
		'description'   => __( 'Appears at the bottom of the content on posts and pages.', 'basictheme' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'basictheme_widgets_init' );


/**
 * Handles JavaScript detection.
 *
 * Adds a `js` class to the root `<html>` element when JavaScript is detected.
 *
 */
function basictheme_javascript_detection() {
	echo "<script>(function(html){html.className = html.className.replace(/\bno-js\b/,'js')})(document.documentElement);</script>\n";
}
add_action( 'wp_head', 'basictheme_javascript_detection', 0 );


/**
 * Enqueues scripts and styles.
*/
function theme_scripts() {
	// Theme stylesheet.
	wp_enqueue_style( 'style', get_stylesheet_uri() );

	// Add main stylesheet
	wp_enqueue_style( 'main.min', get_template_directory_uri() . '/dist/css/main.min.css', array(), '0.1.0' );

	wp_enqueue_script( 'vendors.min', get_template_directory_uri() . '/dist/js/vendors.min.js', array(), '20170816', true );
	wp_enqueue_script( 'main.min', get_template_directory_uri() . '/dist/js/main.min.js', array('jquery'), '20170816', true );
}
add_action( 'wp_enqueue_scripts', 'theme_scripts' );