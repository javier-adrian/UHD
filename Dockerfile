# Use an official PHP image
FROM php:8.3-cli

# Install PHP extensions
RUN docker-php-ext-install mysqli

# Set the working directory
WORKDIR /var/www/html

# Copy application files to the container
COPY ./src /var/www/html

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Expose the port for the PHP built-in server
EXPOSE 8000

# Start PHP's built-in server when the container starts
CMD ["php", "-S", "0.0.0.0:8000", "-t", "/var/www/html"]

