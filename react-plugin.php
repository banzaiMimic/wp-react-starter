<?php
/**
 * Plugin Name: WP React Starter
 * Version:     1.0.0
 * Plugin URI:  https://github.com/banzaiMimic/wp-react-starter
 * Description: Initiate plugin development with a React-ready application.
 * Author:      banzaiMimic
 * Text Domain: react-plugin
 * Domain Path: /languages/
 * License:     GPL v3
 *
 * @package ReactPlugin
 */

define( 'REACT_PLUGIN_VERSION', '1.0.0' );
define( 'REACT_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'REACT_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );

add_action( 'admin_menu', 'react_plugin_admin_menu' );
add_action( 'admin_enqueue_scripts', 'react_plugin_enqueue_scripts' );

if ( ! function_exists( 'react_plugin_admin_menu' ) ) {
	/**
	 * Register admin menu
	 *
	 * @return void
	 */
	function react_plugin_admin_menu() {
		add_menu_page(
			'React Plugin',
			'React Plugin',
			'manage_options',
			'react-plugin',
			'react_plugin_menu_view'
		);
	}
}

if ( ! function_exists( 'react_plugin_menu_view' ) ) {
	/**
	 * Admin page view
	 *
	 * @return void
	 */
	function react_plugin_menu_view() {
?>
		<div id="app"></div>
		<?
	}
}

if ( ! function_exists( 'react_plugin_enqueue_scripts' ) ) {
	/**
	 * Enqueue scripts & styles
	 *
	 * @param string $page Page slug.
	 *
	 * @return void
	 */
	function react_plugin_enqueue_scripts( $page ) {
		$inc = require_once REACT_PLUGIN_PATH . 'build/index.asset.php';

		if ( "toplevel_page_react-plugin" === $page ) {
			wp_enqueue_script(
				'react-plugin',
				REACT_PLUGIN_URL . 'build/index.js',
				$inc['dependencies'],
				$inc['version'],
				true
			);
			wp_enqueue_style(
				'react-plugin',
				REACT_PLUGIN_URL . 'build/style-index.css'
			);
		}
	}
}
