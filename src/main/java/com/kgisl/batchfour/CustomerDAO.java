package com.kgisl.batchfour;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class CustomerDAO {
    private String jdbcURL;
    private String jdbcUsername;
    private String jdbcPassword;
    private Connection jdbcConnection;
    
    public CustomerDAO(String jdbcURL, String jdbcUsername, String jdbcPassword) {
        this.jdbcURL = jdbcURL;
        this.jdbcUsername = jdbcUsername;
        this.jdbcPassword = jdbcPassword;
    }

    protected void connect() throws SQLException {
        if (jdbcConnection == null || jdbcConnection.isClosed()) {
            jdbcConnection = DriverManager.getConnection(
                                        jdbcURL, jdbcUsername, jdbcPassword);
        }
    }
     
    protected void disconnect() throws SQLException {
        if (jdbcConnection != null && !jdbcConnection.isClosed()) {
            jdbcConnection.close();
        }
    }

    public boolean insertCustomer(Customer customer) throws SQLException {
        String sql = "INSERT INTO customer (customername) VALUES (?)";
        connect();
         
        PreparedStatement statement = jdbcConnection.prepareStatement(sql);
        statement.setString(1, customer.getCustomername());
         
        boolean rowInserted = statement.executeUpdate() > 0;
        statement.close();
        disconnect();
        return rowInserted;
    }

    public List<Customer> listAllCustomers() throws SQLException {
        List<Customer> customerList = new ArrayList<Customer>();         
        String sql = "SELECT * FROM customer";         
        connect();         
        Statement statement = jdbcConnection.createStatement();
        ResultSet resultSet = statement.executeQuery(sql);
         
        while (resultSet.next()) {
            int customerid = resultSet.getInt("customerid");
            String customername = resultSet.getString("customername");
             
            Customer customer = new Customer();
            customer.setCustomerid(customerid);
            customer.setCustomername(customername);
            customerList.add(customer);
        }
         
        resultSet.close();
        statement.close();
         
        disconnect();
         
        return customerList;
    }

    public boolean updateCustomer(Customer customer) throws SQLException {
        String sql = "UPDATE customer SET customername = ?";
        sql += " WHERE customerid = ?";
        connect();
         
        PreparedStatement statement = jdbcConnection.prepareStatement(sql);
        statement.setString(1, customer.getCustomername());
        statement.setInt(2, customer.getCustomerid());
         
        boolean rowUpdated = statement.executeUpdate() > 0;
        statement.close();
        disconnect();
        return rowUpdated;     
    }

    public boolean deleteCustomer(Customer customer) throws SQLException {
        String sql = "DELETE FROM customer where customerid = ?";
         
        connect();
         
        PreparedStatement statement = jdbcConnection.prepareStatement(sql);
        statement.setInt(1, customer.getCustomerid());
         
        boolean rowDeleted = statement.executeUpdate() > 0;
        statement.close();
        disconnect();
        return rowDeleted;     
    }

    public Customer getCustomer(int customerid) throws SQLException {
        Customer customer = null;
        String sql = "SELECT * FROM customer WHERE customerid = ?";
         
        connect();
         
        PreparedStatement statement = jdbcConnection.prepareStatement(sql);
        statement.setInt(1, customerid);
         
        ResultSet resultSet = statement.executeQuery();
         
        if (resultSet.next()) {
            int id = resultSet.getInt("customerid");
            String customername = resultSet.getString("customername");
             
            customer = new Customer();
            customer.setCustomerid(id);
            customer.setCustomername(customername);
        }
         
        resultSet.close();
        statement.close();
         
        return customer;
    }
}
